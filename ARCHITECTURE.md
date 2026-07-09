# High-Level Architecture Diagram & System Design: Production Vacation-Rental Marketplace (Airbnb-Scale)

This document presents a production-grade architecture diagram and technical scaling strategy for an Airbnb-scale global vacation rental platform servicing tens of millions of concurrent users, listings, reservations, and real-time availability lookups.

---

## 1. High-Level Architecture Diagram (Mermaid)

```mermaid
flowchart TB
    subgraph ClientLayer ["1. Client & Edge Routing Layer"]
        UserBrowser["Web / Mobile App (React / Next.js / Swift / Kotlin)"]
        EdgeCDN["Global Anycast Edge CDN (Cloudflare / AWS CloudFront)"]
        WAF["DDoS Protection & Bot Mitigation (WAF / Rate Limiter)"]
    end

    subgraph APIGatewayLayer ["2. Edge & Gateway Layer"]
        APIGateway["API Gateway & Reverse Proxy (Kong / Envoy / AWS API Gateway)"]
        AuthService["Auth & Session Management (OAuth2 / JWT / OIDC)"]
    end

    subgraph CoreMicroservices ["3. Core Microservices Layer (Kubernetes / EKS)"]
        ListingService["Listing & Property Catalog Service (Node.js / Go)"]
        SearchService["Geospatial Search & Filtering Service (Go / Java)"]
        BookingService["Booking & Reservation Engine (Distributed Transactions)"]
        PricingService["Dynamic Pricing Engine (Real-time ML Inference)"]
        ReviewService["Reviews & Reputation Engine"]
        MediaService["Media Transformation Engine (Image Resizing / WebP)"]
    end

    subgraph DataStorageLayer ["4. Distributed Data & Caching Layer"]
        RedisCache["Multi-Region In-Memory Cache (Redis Cluster)"]
        OpenSearch["Geospatial & Full-Text Search Engine (OpenSearch Cluster)"]
        PrimaryDB["Primary Relational OLTP Database (PostgreSQL Aurora Multi-AZ)"]
        ReadReplicas["Read Replicas (Global Low-Latency Query Replicas)"]
        S3Storage["Object Storage (AWS S3 - Full High-Res Media Assets)"]
    end

    subgraph AsyncDataProcessing ["5. Event-Driven & Async Background Pipeline"]
        Kafka["Event Bus & Distributed Streaming Platform (Apache Kafka)"]
        AnalyticsEngine["Clickstream & Search Analytics Pipeline (ClickHouse / Snowflake)"]
        SyncWorkers["Search Indexing & Cache Invalidation Workers"]
    end

    %% Client flows
    UserBrowser --> EdgeCDN
    EdgeCDN --> WAF
    WAF --> APIGateway

    %% Gateway flows
    APIGateway --> AuthService
    APIGateway --> ListingService
    APIGateway --> SearchService
    APIGateway --> BookingService
    APIGateway --> PricingService
    APIGateway --> ReviewService

    %% Media flows
    EdgeCDN <--> MediaService
    MediaService <--> S3Storage

    %% Service to Storage flows
    ListingService <--> RedisCache
    ListingService <--> PrimaryDB
    SearchService <--> OpenSearch
    SearchService <--> RedisCache
    BookingService <--> PrimaryDB
    PricingService <--> RedisCache

    %% Event flows
    ListingService --> Kafka
    BookingService --> Kafka
    Kafka --> SyncWorkers
    SyncWorkers --> OpenSearch
    Kafka --> AnalyticsEngine
```

---

## 2. Scaling Strategy across System Pillars

### A. Frontend & Edge Strategy
- **Edge Caching & Static Asset Acceleration**: Static shell bundles, CSS/JS, and property hero images are served from distributed Anycast Edge CDN nodes with `< 15ms` Time-To-First-Byte (TTFB).
- **On-the-Fly Media Transformation**: Property images uploaded by hosts are processed via an Edge Image Service (`MediaService`) into responsive modern formats (`WebP`, `AVIF`) with pre-calculated image srcsets (`sm`, `md`, `lg`, `xl`).

### B. Search & Geospatial Indexing Strategy
- **Low-Latency Geospatial Queries**: Searching across millions of properties within a map bounding box is handled by an **OpenSearch / Elasticsearch Cluster** using H3/S2 spatial indexing and R-tree geometric filters.
- **Cache-First Search Architecture**: High-frequency search queries (e.g., "Goa, India · Weekend stays") hit a distributed **Redis Cluster** populated with pre-warmed search result cards.

### C. Booking & Transactional Consistency
- **ACID Reservation Engine**: Double-booking prevention is enforced via distributed pessimistic locking or optimistic concurrency control (`SELECT ... FOR UPDATE` in PostgreSQL Aurora Multi-AZ) paired with idempotent booking tokens.
- **State Machine Engine**: Reservations progress through strict states (`HELD` → `CONFIRMED` → `PAID` → `COMPLETED`) via saga patterns.

### D. Async Event-Driven Indexing
- When a host updates a listing or a guest completes a booking, the service emits domain events (`ListingUpdated`, `DateBooked`) to **Apache Kafka**.
- Dedicated background consumer workers (`SyncWorkers`) immediately update the search index (`OpenSearch`) and invalidate affected regional Redis keys asynchronously without blocking user-facing API response times.

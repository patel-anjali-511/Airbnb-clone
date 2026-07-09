import axios from "axios";
import { API_BASE_URL } from "../config/api";
import type { Listing, GalleryImage, Review, Amenity, Host } from "../types";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchListing = async (): Promise<Listing> => {
  const { data } = await api.get<Listing>("/api/listing");
  return data;
};

export const fetchGallery = async (): Promise<GalleryImage[]> => {
  const { data } = await api.get<GalleryImage[]>("/api/gallery");
  return data;
};

export const fetchReviews = async (): Promise<Review[]> => {
  const { data } = await api.get<Review[]>("/api/reviews");
  return data;
};

export const fetchAmenities = async (): Promise<Amenity[]> => {
  const { data } = await api.get<Amenity[]>("/api/amenities");
  return data;
};

export const fetchHost = async (): Promise<Host> => {
  const { data } = await api.get<Host>("/api/host");
  return data;
};

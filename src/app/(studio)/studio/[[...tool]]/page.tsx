"use client";

import { NextStudio } from "next-sanity/studio";
import { studioConfig } from "@/sanity/config";

export default function StudioPage() {
  return <NextStudio config={studioConfig} />;
}

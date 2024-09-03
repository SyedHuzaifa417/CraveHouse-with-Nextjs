import React from "react";
import { Metadata } from "next";
import CommunityHead from "@/components/community-component/community-header";

export const metadata: Metadata = {
  title: "Community",
};

const Community: React.FC = () => {
  return <CommunityHead />;
};

export default Community;

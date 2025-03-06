// src/pages/CampaignDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/Progressbar";

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch campaign details based on the id from URL
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`/campaigns/${id}`);
        setCampaign(res.data);
        setShareLink(`${window.location.origin}/campaigns/${id}`);
      } catch (error) {
        console.error("Error fetching campaign:", error);
        setError("Error fetching campaign details. Please try again later.");
      }
    };

    fetchCampaign();
  }, [id]);


  const handleCopyShareLink = () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy link:", err));
  };

  if (error) {
    return (
      <div className="min-h-screen dark:bg-gray-900 bg-white">
        <Navbar />
        <div className="container mx-auto py-10 text-center">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen dark:bg-gray-900 bg-white">
        <Navbar />
        <div className="container mx-auto py-10 text-center">
          <p>Loading campaign details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white overflow-x-hidden">
      <Navbar />
      <div className="grid grid-cols-3 gap-4 mt-32 mb-20 mx-20">
        <div className="col-span-2">
          {/* Image Section */}
          {campaign.image && (
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-[450px] object-cover rounded-lg shadow-lg"
            />
          )}
        </div>
        <div className="mx-10">
          {/* Details Section */}
          <h1 className="text-4xl font-semibold mb-2 uppercase">{campaign.title}</h1>
          <p className="my-2 text-lg">{campaign.description}</p>
          <p className="mb-2">
            Deadline:{" "}
            {new Date(campaign.deadline).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          
            <div className="flex space-x-4 my-4">
              <ProgressBar
                raised={campaign.raised}
                goal={campaign.goal}
                variant="circular"
                size={70}
                strokeWidth={8}
              />
              <div>
                <p className="text-3xl">${campaign.raised} Raised</p>
                <h2 className="text-sm text-slate-400">Goal: ${campaign.goal}</h2>
              </div>
            </div>

          {/* Buttons Section */}
          <div className="flex space-x-4 mb-4">
            <button className="btn-primary">
              Donate Now
            </button>
            <button onClick={handleCopyShareLink} className="btn-primary">
              {copied ? "Link Copied!" : "Share Link"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CampaignDetail;

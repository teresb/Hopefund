// src/pages/FundraiserDetail.js
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/Progressbar";
import Blogs from "../components/Blogs/Blogs";
import { AuthContext } from "../contexts/AuthContext";

const FundraiserDetail = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [fundraiser, setFundraiser] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch fundraiser details based on the id from URL
    const fetchFundraiser = async () => {
      try {
        const res = await axios.get(`/fundraisers/${id}`);
        setFundraiser(res.data);
        setShareLink(`${window.location.origin}/fundraiser/${id}`);
      } catch (error) {
        console.error("Error fetching fundraiser:", error);
        setError("Error fetching fundraiser details. Please try again later.");
      }
    };

    fetchFundraiser();
  }, [id]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!donationAmount || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    try {
      await axios.post("/donate", {
        fundraiserId: id,
        amount: donationAmount,
      });
      alert("Donation successful! Thank you for your support.");
      setDonationAmount("");
      setShowDonationForm(false);
      // Optionally update local state to reflect new raised amount
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Donation failed. Please try again.");
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy link:", err));
  };

  const handleApprove = async () => {
    try {
      await axios.put(`/admin/fundraisers/${id}/approve`);
      alert("Fundraiser approved!");
      setFundraiser({ ...fundraiser, status: "approved" });
    } catch (error) {
      console.error("Error approving fundraiser:", error);
      alert("Error approving fundraiser. Please try again.");
    }
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

  if (!fundraiser) {
    return (
      <div className="min-h-screen dark:bg-gray-900 bg-white">
        <Navbar />
        <div className="container mx-auto py-10 text-center">
          <p>Loading fundraiser details...</p>
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
          {fundraiser.image && (
            <img
              src={fundraiser.image}
              alt={fundraiser.title}
              className="w-full h-[450px] object-cover rounded-lg shadow-lg"
            />
          )}
        </div>
        <div className="mx-10">
          {/* Details Section */}
          <h1 className="text-4xl font-semibold mb-2 uppercase">{fundraiser.title}</h1>
          <p className="my-2 text-lg">{fundraiser.description}</p>
          <p className="mb-2">
            Deadline:{" "}
            {new Date(fundraiser.deadline).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          {/* For admin users, only show the goal */}
          {auth.user && auth.user.role === "admin" ? (
            <div className="mb-4">
              <p className="text-lg">Goal: ${fundraiser.goal}</p>
            </div>
          ) : (
            // For non-admin users, show progress bar and raised amount
            <div className="flex space-x-4 my-4">
              <ProgressBar
                raised={fundraiser.raised}
                goal={fundraiser.goal}
                variant="circular"
                size={70}
                strokeWidth={8}
              />
              <div>
                <p className="text-3xl">${fundraiser.raised} Raised</p>
                <h2 className="text-sm text-slate-400">Goal: ${fundraiser.goal}</h2>
              </div>
            </div>
          )}

          {/* Buttons Section */}
          <div className="flex space-x-4 mb-4">
            {auth.user && auth.user.role === "admin" ? (
              <button onClick={handleApprove} className="btn-primary">
                Approve
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowDonationForm(!showDonationForm)}
                  className="btn-primary"
                >
                  Donate Now
                </button>
                <button onClick={handleCopyShareLink} className="btn-primary">
                  {copied ? "Link Copied!" : "Share Link"}
                </button>
              </>
            )}
          </div>
          {/* Donation Form (only for non-admins) */}
          {(!auth.user || auth.user.role !== "admin") && showDonationForm && (
            <form onSubmit={handleDonate} className="mt-4">
              <label className="block mb-2 font-medium">
                Donation Amount ($):
              </label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <button type="submit" className="btn-primary mt-4">
                Donate Now
              </button>
            </form>
          )}
          {(!auth.user || auth.user.role !== "admin") && showDonationForm && (
                <>
                  <h1 className="ml-20 mt-24 border-l-8 pl-2 text-3xl font-bold">
                    Discover other fundraisers...
                  </h1>
                  <Blogs />
                </>
          
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FundraiserDetail;

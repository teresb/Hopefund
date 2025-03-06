import React from 'react';
import ProgressBar from './Progressbar';

const CampaignCard = ({ campaign, imageClass, showProgressBar = true, onClick }) => {
  return (
    <div
      key={campaign._id}
      onClick={() => onClick(campaign._id)}
      className="p-4 border bg-slate-200 rounded-lg shadow-md"
    >
      {campaign.image && (
        <div className="overflow-hidden">
          <img
            src={campaign.image}
            alt={campaign.title}
            className={imageClass || "w-full h-72 mb-2 object-cover rounded-md"}
          />
        </div>
      )}
      <div className="flex justify-between pt-2 text-slate-600 text-sm">
        <p>Due: {new Date(campaign.deadline).toLocaleDateString()}</p>
      </div>
      <div className="space-y-2 py-2">
        <h1 className="line-clamp-1 font-semibold">{campaign.title}</h1>
        {showProgressBar && (
          <ProgressBar
            raised={campaign.raised}
            goal={campaign.goal}
            variant="horizontal"
            width="100%"
            height="15px"
          />
        )}
        <div className="flex justify-between text-sm mt-2">
          <p>Goal: ${campaign.goal}</p>
          <p>Raised: ${campaign.raised}</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
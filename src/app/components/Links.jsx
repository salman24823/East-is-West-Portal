"use client";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube, EarthIcon } from "lucide-react";

export default function SocialLinksSection() {
  // Default links (used on first load)
  const defaultLinks = {
    website: "https://your-site.example",
    facebook: "https://facebook.com/your-page",
    instagram: "https://instagram.com/your-page",
    youtube: "https://youtube.com/your-channel",
  };

  const [links, setLinks] = useState(defaultLinks);
  const [isEditing, setIsEditing] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedLinks = localStorage.getItem("socialLinks");
    if (storedLinks) setLinks(JSON.parse(storedLinks));
  }, []);

  // Save to localStorage
  const saveLinks = () => {
    localStorage.setItem("socialLinks", JSON.stringify(links));
    setIsEditing(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="">
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Website */}
          <SocialLinkItem
            name="Company Website"
            desc="Staff portal, policies, and resources"
            color="indigo"
            icon={<EarthIcon className="w-6 h-6" />}
            link={links.website}
            isEditing={isEditing}
            onChange={(val) => setLinks({ ...links, website: val })}
          />

          {/* Facebook */}
          <SocialLinkItem
            name="Facebook"
            desc="Community updates and event posts"
            color="blue"
            icon={<Facebook className="w-6 h-6" />}
            link={links.facebook}
            isEditing={isEditing}
            onChange={(val) => setLinks({ ...links, facebook: val })}
          />

          {/* Instagram */}
          <SocialLinkItem
            name="Instagram"
            desc="Photos and behind-the-scenes"
            color="pink"
            icon={<Instagram className="w-6 h-6" />}
            link={links.instagram}
            isEditing={isEditing}
            onChange={(val) => setLinks({ ...links, instagram: val })}
          />

          {/* YouTube */}
          <SocialLinkItem
            name="YouTube"
            desc="Training videos and announcements"
            color="red"
            icon={<Youtube className="w-6 h-6" />}
            link={links.youtube}
            isEditing={isEditing}
            onChange={(val) => setLinks({ ...links, youtube: val })}
          />
        </ul>

        <div className="flex justify-between items-center mb-4">
       
          <button
            onClick={() => (isEditing ? saveLinks() : setIsEditing(true))}
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </section>
  );
}

// Reusable Card Component
function SocialLinkItem({ name, desc, color, icon, link, isEditing, onChange }) {
  const colorClasses = {
    indigo: "bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200",
    blue: "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200",
    pink: "bg-pink-50 dark:bg-pink-900 text-pink-600 dark:text-pink-200",
    red: "bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-200",
  };

  return (
    <li>
      <div
        className={`group flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
      >
        <span className={`flex-shrink-0 p-3 rounded-md ${colorClasses[color]}`}>
          {icon}
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{desc}</p>

          {isEditing ? (
            <input
              type="url"
              value={link}
              onChange={(e) => onChange(e.target.value)}
              className="w-full text-xs border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
          ) : (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline break-all"
            >
              {link}
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  FaAt,
  FaBars,
  FaBell,
  FaBookmark,
  FaCamera,
  FaComment,
  FaCompass,
  FaEdit,
  FaEllipsisH,
  FaEye,
  FaEyeSlash,
  FaHashtag,
  FaHeart,
  FaHome,
  FaImage,
  FaMusic,
  FaPaperPlane,
  FaPlay,
  FaPlayCircle,
  FaPlusCircle,
  FaRegBookmark,
  FaRegHeart,
  FaRegPaperPlane,
  FaSearch,
  FaShare,
  FaSmile,
  FaSyncAlt,
  FaTag,
  FaTimes,
  FaTrash,
  FaUser
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const demoUsers = [
  { username: "arjun_dev", fullName: "Arjun Kumar", profilePic: "https://i.pravatar.cc/150?img=12" },
  { username: "meera_art", fullName: "Meera Art", profilePic: "https://i.pravatar.cc/150?img=32" },
  { username: "travel_diary", fullName: "Travel Diary", profilePic: "https://i.pravatar.cc/150?img=48" },
  { username: "food_spot", fullName: "Food Spot", profilePic: "https://i.pravatar.cc/150?img=25" },
  { username: "nova_creator", fullName: "Nova Creator", profilePic: "https://i.pravatar.cc/150?img=58" },
  { username: "rahul_fitness", fullName: "Rahul Fitness", profilePic: "https://i.pravatar.cc/150?img=11" },
  { username: "anjali_clicks", fullName: "Anjali Photography", profilePic: "https://i.pravatar.cc/150?img=20" },
  { username: "tech_mallu", fullName: "Tech Mallu", profilePic: "https://i.pravatar.cc/150?img=15" },
  { username: "vibe_with_anu", fullName: "Anu Vibes", profilePic: "https://i.pravatar.cc/150?img=29" },
  { username: "coding_beast", fullName: "Coding Beast", profilePic: "https://i.pravatar.cc/150?img=8" },
  { username: "nature_hunter", fullName: "Nature Hunter", profilePic: "https://i.pravatar.cc/150?img=45" },
  { username: "kerala_diaries", fullName: "Kerala Diaries", profilePic: "https://i.pravatar.cc/150?img=36" },
  { username: "style_by_riya", fullName: "Riya Fashion", profilePic: "https://i.pravatar.cc/150?img=47" },
  { username: "movie_addict", fullName: "Movie Addict", profilePic: "https://i.pravatar.cc/150?img=18" },
  { username: "gamer_zone", fullName: "Gamer Zone", profilePic: "https://i.pravatar.cc/150?img=51" },
  { username: "music_world", fullName: "Music World", profilePic: "https://i.pravatar.cc/150?img=40" },
  { username: "daily_motivation", fullName: "Daily Motivation", profilePic: "https://i.pravatar.cc/150?img=60" },
  { username: "street_foodie", fullName: "Street Foodie", profilePic: "https://i.pravatar.cc/150?img=30" },
  { username: "bike_rider", fullName: "Bike Rider", profilePic: "https://i.pravatar.cc/150?img=22" },
  { username: "photo_factory", fullName: "Photo Factory", profilePic: "https://i.pravatar.cc/150?img=44" }
];

const exploreImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700",
  "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=700",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=700",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700"
];

const demoReels = [
  {
    id: 1,
    username: "arjun_dev",
    profilePic: "https://i.pravatar.cc/150?img=12",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    caption: "Frontend project showcase #coding @nova_creator",
    music: "Dream Vibes",
    likes: 1240,
    comments: 88
  },
  {
    id: 2,
    username: "travel_diary",
    profilePic: "https://i.pravatar.cc/150?img=48",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    caption: "Travel mood today #travel #reels",
    music: "Travel Mood",
    likes: 2190,
    comments: 145
  },
  {
    id: 3,
    username: "meera_art",
    profilePic: "https://i.pravatar.cc/150?img=32",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    caption: "Creative reels demo +food_spot",
    music: "Chill Beat",
    likes: 980,
    comments: 41
  },
  {
    id: 4,
    username: "rahul_fitness",
    profilePic: "https://i.pravatar.cc/150?img=11",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    caption: "Morning workout energy #fitness #motivation",
    music: "Happy Pop",
    likes: 3440,
    comments: 212
  },
  {
    id: 5,
    username: "tech_mallu",
    profilePic: "https://i.pravatar.cc/150?img=15",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    caption: "New coding setup #tech @coding_beast",
    music: "Lofi Night",
    likes: 1420,
    comments: 67
  },
  {
    id: 6,
    username: "street_foodie",
    profilePic: "https://i.pravatar.cc/150?img=30",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    caption: "Street food hunt #food #kerala +food_spot",
    music: "Travel Mood",
    likes: 2890,
    comments: 190
  }
];

const musicList = [
  "No music",
  "Dream Vibes",
  "Chill Beat",
  "Travel Mood",
  "Lofi Night",
  "Happy Pop"
];

function readLocalStorage(key, fallback) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
}

function saveLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getHashtags(text = "") {
  return text.match(/#[a-zA-Z0-9_]+/g) || [];
}

function getMentions(text = "") {
  return text.match(/@[a-zA-Z0-9_]+/g) || [];
}

function getTags(text = "") {
  return text.match(/\+[a-zA-Z0-9_]+/g) || [];
}

function renderCaptionParts(text, openHashtag, openMention, openTag) {
  const parts =
    text?.split(/(#[a-zA-Z0-9_]+|@[a-zA-Z0-9_]+|\+[a-zA-Z0-9_]+)/g) || [];

  return parts.map((part, index) => {
    if (part.startsWith("#")) {
      return (
        <button
          key={index}
          type="button"
          className="hashtag-btn"
          onClick={() => openHashtag(part)}
        >
          {part}
        </button>
      );
    }

    if (part.startsWith("@")) {
      return (
        <button
          key={index}
          type="button"
          className="mention-btn"
          onClick={() => openMention(part)}
        >
          {part}
        </button>
      );
    }

    if (part.startsWith("+")) {
      return (
        <button
          key={index}
          type="button"
          className="tag-btn"
          onClick={() => openTag(part)}
        >
          {part}
        </button>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function App() {
  const [mode, setMode] = useState("login");
  const [page, setPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createMode, setCreateMode] = useState("post");
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [activeHashtag, setActiveHashtag] = useState("");

  const [stories, setStories] = useState(() =>
    readLocalStorage("sg_stories", [])
  );
  const [activeStory, setActiveStory] = useState(null);
  const [activePost, setActivePost] = useState(null);

  const [storyReply, setStoryReply] = useState("");
  const [storyComments, setStoryComments] = useState(() =>
    readLocalStorage("sg_story_comments", {})
  );

  const [sharedItems, setSharedItems] = useState(() =>
    readLocalStorage("sg_shared", [])
  );
  const [followingUsers, setFollowingUsers] = useState(() =>
    readLocalStorage("sg_following_users", [])
  );
  const [recentActivities, setRecentActivities] = useState(() =>
    readLocalStorage("sg_recent_activities", [])
  );

  const [savedIds, setSavedIds] = useState(() =>
    readLocalStorage("sg_saved", [])
  );
  const [messages, setMessages] = useState(() =>
    readLocalStorage("sg_messages", {})
  );

  const [activeChat, setActiveChat] = useState(demoUsers[0]);
  const [chatText, setChatText] = useState("");

  const [showCamera, setShowCamera] = useState(false);
  const [cameraTarget, setCameraTarget] = useState("post");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: ""
  });

  const [postForm, setPostForm] = useState({
    caption: "",
    imageUrl: "",
    music: "No music"
  });

  const [storyForm, setStoryForm] = useState({
    imageUrl: "",
    caption: "",
    music: "No music"
  });

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    bio: "",
    profilePic: ""
  });

  const authHeader = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    [token]
  );

  function showToast(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  function navTo(targetPage) {
    setPage(targetPage);
    closeSidebar();
  }

  function handleTouchStart(e) {
    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchMove(e) {
    if (touchStartX === null) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;

    if (touchStartX < 35 && diff > 70) {
      setSidebarOpen(true);
      setTouchStartX(null);
    }

    if (sidebarOpen && diff < -70) {
      setSidebarOpen(false);
      setTouchStartX(null);
    }
  }

  function addActivity(activity) {
    const newActivity = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      ...activity
    };

    setRecentActivities((previous) => [newActivity, ...previous].slice(0, 40));
  }

  function toggleFollow(targetUser) {
    const alreadyFollowing = followingUsers.includes(targetUser.username);

    if (alreadyFollowing) {
      setFollowingUsers((previous) =>
        previous.filter((username) => username !== targetUser.username)
      );

      addActivity({
        type: "unfollow",
        username: targetUser.username,
        fullName: targetUser.fullName,
        profilePic: targetUser.profilePic,
        text: `You unfollowed @${targetUser.username}`
      });

      showToast(`Unfollowed @${targetUser.username}`);
      return;
    }

    setFollowingUsers((previous) => [...previous, targetUser.username]);

    addActivity({
      type: "follow",
      username: targetUser.username,
      fullName: targetUser.fullName,
      profilePic: targetUser.profilePic,
      text: `You started following @${targetUser.username}`
    });

    showToast(`Following @${targetUser.username}`);
  }

  async function fetchPosts() {
    try {
      const response = await axios.get(`${API}/posts`, authHeader);
      setPosts(response.data.posts || []);
    } catch {
      showToast("Failed to fetch posts");
    }
  }

  useEffect(() => {
    if (token) fetchPosts();
  }, [token]);

  useEffect(() => {
    if (!user) return;

    setProfileForm({
      fullName: user.fullName || "",
      bio: user.bio || "",
      profilePic: user.profilePic || ""
    });
  }, [user]);

  useEffect(() => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const validStories = stories.filter((story) => now - story.createdAt < oneDay);

    if (validStories.length !== stories.length) {
      setStories(validStories);
      saveLocalStorage("sg_stories", validStories);
    }
  }, []);

  useEffect(() => saveLocalStorage("sg_stories", stories), [stories]);
  useEffect(() => saveLocalStorage("sg_saved", savedIds), [savedIds]);
  useEffect(() => saveLocalStorage("sg_messages", messages), [messages]);
  useEffect(() => saveLocalStorage("sg_story_comments", storyComments), [storyComments]);
  useEffect(() => saveLocalStorage("sg_shared", sharedItems), [sharedItems]);
  useEffect(() => saveLocalStorage("sg_following_users", followingUsers), [followingUsers]);
  useEffect(() => saveLocalStorage("sg_recent_activities", recentActivities), [recentActivities]);

  const myPosts = useMemo(() => {
    return posts.filter((post) => post.user?._id === user?._id);
  }, [posts, user]);

  const savedPosts = useMemo(() => {
    return posts.filter((post) => savedIds.includes(post._id));
  }, [posts, savedIds]);

  const allHashtags = useMemo(() => {
    return [...new Set(posts.flatMap((post) => getHashtags(post.caption)))];
  }, [posts]);

  const allMentions = useMemo(() => {
    return [...new Set(posts.flatMap((post) => getMentions(post.caption)))];
  }, [posts]);

  const allTags = useMemo(() => {
    return [...new Set(posts.flatMap((post) => getTags(post.caption)))];
  }, [posts]);

  const filteredUsers = useMemo(() => {
    const query = searchText.toLowerCase().trim();
    if (!query) return demoUsers;

    return demoUsers.filter(
      (demoUser) =>
        demoUser.username.toLowerCase().includes(query) ||
        demoUser.fullName.toLowerCase().includes(query)
    );
  }, [searchText]);

  const hashtagPosts = useMemo(() => {
    if (!activeHashtag) return [];
    return posts.filter((post) => post.caption?.includes(activeHashtag));
  }, [posts, activeHashtag]);

  const currentActivePost = useMemo(() => {
    if (!activePost) return null;
    return posts.find((post) => post._id === activePost._id) || activePost;
  }, [activePost, posts]);

  async function signup(e) {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/auth/signup`, form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setToken(response.data.token);
      setUser(response.data.user);
      showToast("Account created successfully");
    } catch (error) {
      showToast(error.response?.data?.message || "Signup failed");
    }
  }

  async function login(e) {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/auth/login`, {
        email: form.email,
        password: form.password
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setToken(response.data.token);
      setUser(response.data.user);
      showToast("Login successful");
    } catch (error) {
      showToast(error.response?.data?.message || "Login failed");
    }
  }

  async function createPost(e) {
    e.preventDefault();

    if (!postForm.imageUrl.trim()) {
      showToast("Image is required");
      return;
    }

    let finalCaption = postForm.caption;

    if (postForm.music && postForm.music !== "No music") {
      finalCaption = `${finalCaption}\n🎵 ${postForm.music}`;
    }

    try {
      const response = await axios.post(
        `${API}/posts`,
        {
          caption: finalCaption,
          imageUrl: postForm.imageUrl
        },
        authHeader
      );

      setPosts((previous) => [response.data.post, ...previous]);

      addActivity({
        type: "post",
        username: user.username,
        fullName: user.fullName,
        profilePic: user.profilePic,
        imageUrl: postForm.imageUrl,
        text: "You created a new post"
      });

      setPostForm({
        caption: "",
        imageUrl: "",
        music: "No music"
      });

      setShowCreateModal(false);
      setPage("home");
      showToast("Post shared");
    } catch (error) {
      showToast(error.response?.data?.message || "Post failed");
    }
  }

  function addStory(e) {
    e.preventDefault();

    if (!storyForm.imageUrl.trim()) {
      showToast("Story image is required");
      return;
    }

    const newStory = {
      id: Date.now(),
      userId: user._id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
      imageUrl: storyForm.imageUrl,
      caption: storyForm.caption,
      music: storyForm.music,
      createdAt: Date.now()
    };

    setStories((previous) => [newStory, ...previous]);

    addActivity({
      type: "story",
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
      imageUrl: storyForm.imageUrl,
      text: "You added a new story"
    });

    setStoryForm({
      imageUrl: "",
      caption: "",
      music: "No music"
    });

    setShowCreateModal(false);
    showToast("Story uploaded");
  }

  function deleteStory(storyId) {
    setStories((previous) => previous.filter((story) => story.id !== storyId));
    setActiveStory(null);
    showToast("Story deleted");
  }

  async function likePost(id) {
    try {
      const oldPost = posts.find((post) => post._id === id);
      const alreadyLiked = oldPost?.likes?.some((likeId) => likeId === user._id);

      const response = await axios.put(`${API}/posts/${id}/like`, {}, authHeader);

      setPosts((previous) =>
        previous.map((post) => (post._id === id ? response.data.post : post))
      );

      if (!alreadyLiked && oldPost) {
        addActivity({
          type: "like",
          username: oldPost.user?.username,
          fullName: oldPost.user?.fullName || oldPost.user?.username,
          profilePic: oldPost.user?.profilePic,
          imageUrl: oldPost.imageUrl,
          text: `You liked @${oldPost.user?.username}'s post`
        });
      }
    } catch {
      showToast("Like failed");
    }
  }

  async function commentPost(id, text) {
    if (!text.trim()) return;

    try {
      const oldPost = posts.find((post) => post._id === id);

      const response = await axios.post(
        `${API}/posts/${id}/comment`,
        { text },
        authHeader
      );

      setPosts((previous) =>
        previous.map((post) => (post._id === id ? response.data.post : post))
      );

      if (oldPost) {
        addActivity({
          type: "comment",
          username: oldPost.user?.username,
          fullName: oldPost.user?.fullName || oldPost.user?.username,
          profilePic: oldPost.user?.profilePic,
          imageUrl: oldPost.imageUrl,
          text: `You commented on @${oldPost.user?.username}'s post`
        });
      }
    } catch {
      showToast("Comment failed");
    }
  }

  async function deletePost(id) {
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API}/posts/${id}`, authHeader);

      setPosts((previous) => previous.filter((post) => post._id !== id));
      setActivePost(null);
      showToast("Post deleted");
    } catch {
      showToast("Delete failed");
    }
  }

  function handleProfileImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 500;

        canvas.width = size;
        canvas.height = size;

        const context = canvas.getContext("2d");
        const minSide = Math.min(image.width, image.height);
        const startX = (image.width - minSide) / 2;
        const startY = (image.height - minSide) / 2;

        context.drawImage(
          image,
          startX,
          startY,
          minSide,
          minSide,
          0,
          0,
          size,
          size
        );

        const compressedImage = canvas.toDataURL("image/jpeg", 0.75);

        setProfileForm((previous) => ({
          ...previous,
          profilePic: compressedImage
        }));

        showToast("Profile image selected");
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  }

  function updateProfile(e) {
    e.preventDefault();

    const updatedUser = {
      ...user,
      fullName: profileForm.fullName,
      bio: profileForm.bio,
      profilePic: profileForm.profilePic || user.profilePic
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowProfileEdit(false);

    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.user?._id === user._id
          ? {
              ...post,
              user: {
                ...post.user,
                fullName: updatedUser.fullName,
                bio: updatedUser.bio,
                profilePic: updatedUser.profilePic
              }
            }
          : post
      )
    );

    setStories((previousStories) =>
      previousStories.map((story) =>
        story.userId === user._id
          ? {
              ...story,
              fullName: updatedUser.fullName,
              profilePic: updatedUser.profilePic
            }
          : story
      )
    );

    addActivity({
      type: "profile",
      username: updatedUser.username,
      fullName: updatedUser.fullName,
      profilePic: updatedUser.profilePic,
      text: "You updated your profile"
    });

    showToast("Profile updated");
  }

  function toggleSave(postId) {
    if (savedIds.includes(postId)) {
      setSavedIds((previous) => previous.filter((id) => id !== postId));
      showToast("Removed from saved");
      return;
    }

    setSavedIds((previous) => [...previous, postId]);

    const post = posts.find((item) => item._id === postId);

    if (post) {
      addActivity({
        type: "save",
        username: post.user?.username,
        fullName: post.user?.fullName || post.user?.username,
        profilePic: post.user?.profilePic,
        imageUrl: post.imageUrl,
        text: `You saved @${post.user?.username}'s post`
      });
    }

    showToast("Post saved");
  }

  function sendMessage(e) {
    e.preventDefault();

    if (!chatText.trim() || !activeChat) return;

    const chatKey = activeChat.username;

    const newMessage = {
      id: Date.now(),
      from: user.username,
      to: chatKey,
      text: chatText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setMessages((previous) => ({
      ...previous,
      [chatKey]: [...(previous[chatKey] || []), newMessage]
    }));

    addActivity({
      type: "message",
      username: activeChat.username,
      fullName: activeChat.fullName,
      profilePic: activeChat.profilePic,
      text: `You messaged @${activeChat.username}`
    });

    setChatText("");
  }

  function openHashtag(tag) {
    setActiveHashtag(tag);
    setPage("hashtag");
    closeSidebar();
  }

  function openMention(mention) {
    showToast(`${mention} profile demo`);
  }

  function openTag(tag) {
    showToast(`${tag.replace("+", "@")} tagged demo`);
  }

  function sharePost(post) {
    const sharedPost = {
      id: Date.now(),
      type: "post",
      postId: post._id,
      username: post.user?.username,
      imageUrl: post.imageUrl,
      caption: post.caption,
      sharedAt: new Date().toLocaleString()
    };

    setSharedItems((previous) => [sharedPost, ...previous]);

    addActivity({
      type: "share",
      username: post.user?.username,
      fullName: post.user?.fullName || post.user?.username,
      profilePic: post.user?.profilePic,
      imageUrl: post.imageUrl,
      text: `You shared @${post.user?.username}'s post`
    });

    showToast("Post shared to demo inbox");
  }

  function shareStory(story) {
    const sharedStory = {
      id: Date.now(),
      type: "story",
      storyId: story.id,
      username: story.username,
      imageUrl: story.imageUrl,
      caption: story.caption,
      sharedAt: new Date().toLocaleString()
    };

    setSharedItems((previous) => [sharedStory, ...previous]);

    addActivity({
      type: "story_share",
      username: story.username,
      fullName: story.fullName || story.username,
      profilePic: story.profilePic,
      imageUrl: story.imageUrl,
      text: `You shared @${story.username}'s story`
    });

    showToast("Story shared to demo inbox");
  }

  function addStoryReply(storyId) {
    if (!storyReply.trim()) return;

    const reply = {
      id: Date.now(),
      user: user.username,
      text: storyReply,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setStoryComments((previous) => ({
      ...previous,
      [storyId]: [...(previous[storyId] || []), reply]
    }));

    const story = stories.find((item) => item.id === storyId);

    if (story) {
      addActivity({
        type: "story_reply",
        username: story.username,
        fullName: story.fullName || story.username,
        profilePic: story.profilePic,
        imageUrl: story.imageUrl,
        text: `You replied to @${story.username}'s story`
      });
    }

    setStoryReply("");
    showToast("Reply added");
  }

  async function startCamera(target) {
    try {
      setCameraTarget(target);
      setShowCamera(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      streamRef.current = stream;

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch {
      showToast("Camera permission denied or not available");
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    setShowCamera(false);
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 720;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    if (cameraTarget === "story") {
      setStoryForm((previous) => ({
        ...previous,
        imageUrl: imageData
      }));
      setCreateMode("story");
    } else {
      setPostForm((previous) => ({
        ...previous,
        imageUrl: imageData
      }));
      setCreateMode("post");
    }

    stopCamera();
    setShowCreateModal(true);
    showToast("Photo captured");
  }

  function handleGalleryImage(e, target) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      if (target === "story") {
        setStoryForm((previous) => ({
          ...previous,
          imageUrl: imageData
        }));
        setCreateMode("story");
      } else {
        setPostForm((previous) => ({
          ...previous,
          imageUrl: imageData
        }));
        setCreateMode("post");
      }

      showToast("Image selected from gallery");
    };

    reader.readAsDataURL(file);
  }

  function clearDemoData() {
    localStorage.removeItem("sg_stories");
    localStorage.removeItem("sg_saved");
    localStorage.removeItem("sg_messages");
    localStorage.removeItem("sg_story_comments");
    localStorage.removeItem("sg_shared");
    localStorage.removeItem("sg_following_users");
    localStorage.removeItem("sg_recent_activities");
    window.location.reload();
  }

  function logout() {
    localStorage.clear();
    setToken("");
    setUser(null);
    setPosts([]);
    setPage("home");
    closeSidebar();
  }

  if (!token || !user) {
    return (
      <div className="auth-page">
        <div className="login-shell">
          <div className="phone-preview">
            <div className="phone-card phone-one"></div>
            <div className="phone-card phone-two"></div>
          </div>

          <div className="auth-right">
            <div className="auth-card">
              <div className="brand-logo">SocialGram</div>
              <p className="sub">Photo sharing MERN project</p>

              <div className="tabs">
                <button
                  type="button"
                  className={mode === "login" ? "active" : ""}
                  onClick={() => setMode("login")}
                >
                  Login
                </button>

                <button
                  type="button"
                  className={mode === "signup" ? "active" : ""}
                  onClick={() => setMode("signup")}
                >
                  Signup
                </button>
              </div>

              <form onSubmit={mode === "login" ? login : signup}>
                {mode === "signup" && (
                  <>
                    <input
                      placeholder="Username"
                      value={form.username}
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                    />

                    <input
                      placeholder="Full Name"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                    />
                  </>
                )}

                <input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <div className="password-box">
                  <input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button className="main-btn" type="submit">
                  {mode === "login" ? "Log in" : "Create Account"}
                </button>
              </form>
            </div>

            <div className="switch-card">
              {mode === "login" ? (
                <p>
                  Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => setMode("signup")}>
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button type="button" onClick={() => setMode("login")}>
                    Log in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        {message && <div className="toast">{message}</div>}
      </div>
    );
  }

  return (
    <div
      className="app"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <Sidebar
        page={page}
        sidebarOpen={sidebarOpen}
        navTo={navTo}
        openCreate={() => {
          setCreateMode("post");
          setShowCreateModal(true);
          closeSidebar();
        }}
        openMore={() => setShowMoreMenu(true)}
      />

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <main className="layout">
        <section className="feed-area">
          {page === "home" && (
            <>
              <StoryRow
                user={user}
                posts={posts}
                stories={stories}
                openStory={setActiveStory}
                openCreate={() => {
                  setCreateMode("story");
                  setShowCreateModal(true);
                }}
              />

              <div className="feed-header">
                <h3>Feed</h3>
                <button type="button" onClick={fetchPosts}>
                  <FaSyncAlt /> Refresh
                </button>
              </div>

              {posts.length === 0 && (
                <EmptyState
                  title="No posts yet"
                  text="Create your first post."
                  buttonText="Create Post"
                  onClick={() => {
                    setCreateMode("post");
                    setShowCreateModal(true);
                  }}
                />
              )}

              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  likePost={likePost}
                  commentPost={commentPost}
                  deletePost={deletePost}
                  saved={savedIds.includes(post._id)}
                  toggleSave={toggleSave}
                  openHashtag={openHashtag}
                  openMention={openMention}
                  openTag={openTag}
                  sharePost={sharePost}
                  setActivePost={setActivePost}
                />
              ))}
            </>
          )}

          {page === "search" && (
            <SearchPage
              searchText={searchText}
              setSearchText={setSearchText}
              filteredUsers={filteredUsers}
              allHashtags={allHashtags}
              allMentions={allMentions}
              allTags={allTags}
              openHashtag={openHashtag}
              openMention={openMention}
              openTag={openTag}
              followingUsers={followingUsers}
              toggleFollow={toggleFollow}
            />
          )}

          {page === "explore" && <ExplorePage />}

          {page === "reels" && (
            <ReelsPage
              openHashtag={openHashtag}
              openMention={openMention}
              openTag={openTag}
            />
          )}

          {page === "messages" && (
            <MessagesPage
              user={user}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              messages={messages}
              chatText={chatText}
              setChatText={setChatText}
              sendMessage={sendMessage}
              sharedItems={sharedItems}
            />
          )}

          {page === "notifications" && (
            <NotificationsPage recentActivities={recentActivities} />
          )}

          {page === "hashtags" && (
            <HashtagsPage
              allHashtags={allHashtags}
              allMentions={allMentions}
              allTags={allTags}
              openHashtag={openHashtag}
              openMention={openMention}
              openTag={openTag}
            />
          )}

          {page === "hashtag" && (
            <PostListPage
              title={activeHashtag}
              subtitle={`${hashtagPosts.length} posts`}
              emptyTitle="No posts"
              emptyText="No posts found for this hashtag."
              posts={hashtagPosts}
              user={user}
              savedIds={savedIds}
              likePost={likePost}
              commentPost={commentPost}
              deletePost={deletePost}
              toggleSave={toggleSave}
              openHashtag={openHashtag}
              openMention={openMention}
              openTag={openTag}
              sharePost={sharePost}
              setActivePost={setActivePost}
            />
          )}

          {page === "saved" && (
            <PostListPage
              title="Saved Posts"
              subtitle="Posts saved in localStorage"
              emptyTitle="No saved posts"
              emptyText="Tap bookmark icon on posts to save them."
              posts={savedPosts}
              user={user}
              savedIds={savedIds}
              likePost={likePost}
              commentPost={commentPost}
              deletePost={deletePost}
              toggleSave={toggleSave}
              openHashtag={openHashtag}
              openMention={openMention}
              openTag={openTag}
              sharePost={sharePost}
              setActivePost={setActivePost}
            />
          )}

          {page === "profile" && (
            <ProfilePage
              user={user}
              myPosts={myPosts}
              followingUsers={followingUsers}
              setShowProfileEdit={setShowProfileEdit}
              setActivePost={setActivePost}
            />
          )}
        </section>

        <RightPanel
          user={user}
          logout={logout}
          openCreate={() => {
            setCreateMode("post");
            setShowCreateModal(true);
          }}
          followingUsers={followingUsers}
          toggleFollow={toggleFollow}
        />
      </main>

      {showCreateModal && (
        <CreateModal
          createMode={createMode}
          setCreateMode={setCreateMode}
          postForm={postForm}
          setPostForm={setPostForm}
          storyForm={storyForm}
          setStoryForm={setStoryForm}
          createPost={createPost}
          addStory={addStory}
          startCamera={startCamera}
          handleGalleryImage={handleGalleryImage}
          close={() => setShowCreateModal(false)}
        />
      )}

      {showProfileEdit && (
        <EditProfileModal
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          updateProfile={updateProfile}
          handleProfileImage={handleProfileImage}
          close={() => setShowProfileEdit(false)}
        />
      )}

      {activeStory && (
        <StoryViewer
          story={activeStory}
          currentUser={user}
          close={() => setActiveStory(null)}
          deleteStory={deleteStory}
          storyReply={storyReply}
          setStoryReply={setStoryReply}
          storyComments={storyComments}
          addStoryReply={addStoryReply}
          shareStory={shareStory}
          openHashtag={openHashtag}
          openMention={openMention}
          openTag={openTag}
        />
      )}

      {currentActivePost && (
        <PostViewer
          post={currentActivePost}
          user={user}
          close={() => setActivePost(null)}
          likePost={likePost}
          commentPost={commentPost}
          saved={savedIds.includes(currentActivePost._id)}
          toggleSave={toggleSave}
          openHashtag={openHashtag}
          openMention={openMention}
          openTag={openTag}
          sharePost={sharePost}
        />
      )}

      {showCamera && (
        <CameraModal
          videoRef={videoRef}
          canvasRef={canvasRef}
          capturePhoto={capturePhoto}
          close={stopCamera}
        />
      )}

      {showMoreMenu && (
        <MoreMenu
          close={() => setShowMoreMenu(false)}
          openSettings={() => {
            setShowMoreMenu(false);
            setShowSettingsModal(true);
          }}
          goSaved={() => {
            setShowMoreMenu(false);
            navTo("saved");
          }}
          goNotifications={() => {
            setShowMoreMenu(false);
            navTo("notifications");
          }}
          logout={logout}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          close={() => setShowSettingsModal(false)}
          user={user}
          followingUsers={followingUsers}
          savedIds={savedIds}
          recentActivities={recentActivities}
          clearDemoData={clearDemoData}
          openEditProfile={() => {
            setShowSettingsModal(false);
            setShowProfileEdit(true);
          }}
        />
      )}

      {message && <div className="toast">{message}</div>}
    </div>
  );
}

function Sidebar({ page, sidebarOpen, navTo, openCreate, openMore }) {
  const navItems = [
    { key: "home", label: "Home", icon: <FaHome /> },
    { key: "search", label: "Search", icon: <FaSearch /> },
    { key: "explore", label: "Explore", icon: <FaCompass /> },
    { key: "reels", label: "Reels", icon: <FaPlayCircle /> },
    { key: "messages", label: "Messages", icon: <FaRegPaperPlane /> },
    { key: "notifications", label: "Notifications", icon: <FaBell /> },
    { key: "hashtags", label: "Hashtags", icon: <FaHashtag /> },
    { key: "saved", label: "Saved", icon: <FaBookmark /> },
    { key: "profile", label: "Profile", icon: <FaUser /> }
  ];

  return (
    <aside className={sidebarOpen ? "sidebar sidebar-open" : "sidebar"}>
      <h2>SocialGram</h2>

      {navItems.map((item) => {
        const active =
          page === item.key || (item.key === "hashtags" && page === "hashtag");

        return (
          <button
            key={item.key}
            type="button"
            className={active ? "nav-btn active" : "nav-btn"}
            onClick={() => navTo(item.key)}
          >
            {item.icon} <span>{item.label}</span>
          </button>
        );
      })}

      <button type="button" className="nav-btn" onClick={openCreate}>
        <FaPlusCircle /> <span>Create</span>
      </button>

      <button type="button" className="nav-btn more-btn" onClick={openMore}>
        <FaBars /> <span>More</span>
      </button>
    </aside>
  );
}

function EmptyState({ title, text, buttonText, onClick }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p>{text}</p>

      {buttonText && (
        <button type="button" className="mini-primary" onClick={onClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

function StoryRow({ user, posts, stories, openStory, openCreate }) {
  const demoStoryItems = [
    ...posts.slice(0, 3).map((post) => ({
      id: `demo-${post._id}`,
      username: post.user?.username,
      profilePic: post.user?.profilePic,
      imageUrl: post.imageUrl,
      caption: post.caption,
      createdAt: Date.now()
    })),
    ...demoUsers.map((demoUser, index) => ({
      id: `demo-user-${index}`,
      username: demoUser.username,
      profilePic: demoUser.profilePic,
      imageUrl: exploreImages[index % exploreImages.length],
      caption: "Demo story",
      createdAt: Date.now()
    }))
  ];

  const allStories = [...stories, ...demoStoryItems];

  return (
    <div className="story-row">
      <div className="story" onClick={openCreate}>
        <div className="story-ring your-story">
          <img src={user?.profilePic} alt="" />
          <span>+</span>
        </div>
        <p>Your story</p>
      </div>

      {allStories.slice(0, 18).map((story) => (
        <div className="story" key={story.id} onClick={() => openStory(story)}>
          <div className="story-ring">
            <img src={story.profilePic} alt="" />
          </div>
          <p>{story.username}</p>
        </div>
      ))}
    </div>
  );
}

function PostCard({
  post,
  user,
  likePost,
  commentPost,
  deletePost,
  saved,
  toggleSave,
  openHashtag,
  openMention,
  openTag,
  sharePost,
  setActivePost
}) {
  const [comment, setComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const liked = post.likes?.some((id) => id === user._id);
  const comments = post.comments || [];
  const visibleComments = showAllComments ? comments : comments.slice(-2);

  function submitComment(e) {
    e.preventDefault();
    commentPost(post._id, comment);
    setComment("");
  }

  return (
    <article className="post-card">
      <div className="post-top">
        <div className="post-user">
          <img src={post.user?.profilePic} alt="" />
          <div>
            <b>{post.user?.username}</b>
            <p>Original post</p>
          </div>
        </div>

        <div className="post-more">
          {post.user?._id === user._id && (
            <button
              type="button"
              className="delete-btn"
              onClick={() => deletePost(post._id)}
            >
              <FaTrash />
            </button>
          )}

          <button type="button">
            <FaEllipsisH />
          </button>
        </div>
      </div>

      <img
        className="post-img"
        src={post.imageUrl}
        alt=""
        onClick={() => setActivePost(post)}
        onDoubleClick={() => likePost(post._id)}
      />

      <div className="post-actions">
        <div>
          <button type="button" onClick={() => likePost(post._id)}>
            {liked ? <FaHeart className="liked" /> : <FaRegHeart />}
          </button>

          <button type="button" onClick={() => setActivePost(post)}>
            <FaComment />
          </button>

          <button type="button" onClick={() => sharePost(post)}>
            <FaRegPaperPlane />
          </button>
        </div>

        <button type="button" onClick={() => toggleSave(post._id)}>
          {saved ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      <div className="post-content">
        <p className="likes">{post.likes?.length || 0} likes</p>

        <p className="caption">
          <b>{post.user?.username}</b>{" "}
          {renderCaptionParts(post.caption, openHashtag, openMention, openTag)}
        </p>

        {comments.length > 2 && (
          <button
            type="button"
            className="view-comments"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? "Hide comments" : `View all ${comments.length} comments`}
          </button>
        )}

        <div className="comments">
          {visibleComments.map((item) => (
            <p key={item._id || item.id}>
              <b>{item.user?.username}</b> {item.text}
            </p>
          ))}
        </div>
      </div>

      <form className="comment-form" onSubmit={submitComment}>
        <FaSmile />
        <input
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </article>
  );
}

function SearchPage({
  searchText,
  setSearchText,
  filteredUsers,
  allHashtags,
  allMentions,
  allTags,
  openHashtag,
  openMention,
  openTag,
  followingUsers,
  toggleFollow
}) {
  return (
    <div className="page-card">
      <h2>Search</h2>

      <div className="search-box">
        <FaSearch />
        <input
          placeholder="Search users, hashtags, mentions or tags"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <h3 className="section-small-title">People</h3>

      <div className="user-list">
        {filteredUsers.map((demoUser) => {
          const isFollowing = followingUsers.includes(demoUser.username);

          return (
            <div className="list-user" key={demoUser.username}>
              <img src={demoUser.profilePic} alt="" />
              <div>
                <b>{demoUser.username}</b>
                <p>{demoUser.fullName}</p>
              </div>

              <button
                type="button"
                className={isFollowing ? "following-btn" : ""}
                onClick={() => toggleFollow(demoUser)}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          );
        })}
      </div>

      <TagSection
        title="Hashtags"
        emptyText="No hashtags yet. Add #travel or #photo in caption."
        items={allHashtags}
        icon={<FaHashtag />}
        cleanPrefix="#"
        onClick={openHashtag}
      />

      <TagSection
        title="Mentions"
        emptyText="No mentions yet. Add @arjun_dev in caption."
        items={allMentions}
        icon={<FaAt />}
        cleanPrefix="@"
        onClick={openMention}
      />

      <TagSection
        title="Tags"
        emptyText="No tags yet. Add +meera_art in caption."
        items={allTags}
        icon={<FaTag />}
        cleanPrefix="+"
        onClick={openTag}
      />
    </div>
  );
}

function TagSection({ title, emptyText, items, icon, cleanPrefix, onClick }) {
  return (
    <>
      <h3 className="section-small-title">{title}</h3>

      <div className="hashtag-list">
        {items.length === 0 ? (
          <p>{emptyText}</p>
        ) : (
          items.map((item) => (
            <button type="button" key={item} onClick={() => onClick(item)}>
              {icon} {item.replace(cleanPrefix, "")}
            </button>
          ))
        )}
      </div>
    </>
  );
}

function ExplorePage() {
  return (
    <div className="explore-page">
      <div className="page-title">
        <h2>Explore</h2>
        <p>Discover popular photos</p>
      </div>

      <div className="explore-grid">
        {exploreImages.map((image, index) => (
          <img
            key={image}
            className={index % 7 === 0 ? "big-explore" : ""}
            src={image}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}

function ReelsPage({ openHashtag, openMention, openTag }) {
  const [activeReel, setActiveReel] = useState(null);

  function togglePlay(id, videoElement) {
    if (!videoElement) return;

    if (activeReel === id) {
      videoElement.pause();
      setActiveReel(null);
      return;
    }

    document.querySelectorAll(".reel-video").forEach((video) => {
      video.pause();
    });

    videoElement.play();
    setActiveReel(id);
  }

  return (
    <div className="reels-page">
      <div className="page-title reels-title">
        <h2>Reels</h2>
        <p>Short video demo feed</p>
      </div>

      <div className="reels-feed">
        {demoReels.map((reel) => (
          <div className="reel-card" key={reel.id}>
            <video
              className="reel-video"
              src={reel.videoUrl}
              loop
              playsInline
              onClick={(e) => togglePlay(reel.id, e.currentTarget)}
            ></video>

            <button
              className="reel-play-btn"
              type="button"
              onClick={(e) => {
                const video = e.currentTarget
                  .closest(".reel-card")
                  .querySelector("video");

                togglePlay(reel.id, video);
              }}
            >
              <FaPlayCircle />
            </button>

            <div className="reel-info">
              <div className="reel-user">
                <img src={reel.profilePic} alt="" />
                <b>{reel.username}</b>
                <button type="button">Follow</button>
              </div>

              <p>
                {renderCaptionParts(
                  reel.caption,
                  openHashtag,
                  openMention,
                  openTag
                )}
              </p>

              <span>
                <FaMusic /> {reel.music}
              </span>
            </div>

            <div className="reel-actions">
              <button type="button">
                <FaRegHeart />
                <span>{reel.likes}</span>
              </button>

              <button type="button">
                <FaComment />
                <span>{reel.comments}</span>
              </button>

              <button type="button">
                <FaRegPaperPlane />
              </button>

              <button type="button">
                <FaBookmark />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPage({
  user,
  activeChat,
  setActiveChat,
  messages,
  chatText,
  setChatText,
  sendMessage,
  sharedItems
}) {
  const chatMessages = messages[activeChat?.username] || [];

  return (
    <div className="message-layout">
      <div className="message-left">
        <div className="message-head">
          <h2>{user.username}</h2>
          <FaEdit />
        </div>

        {demoUsers.map((demoUser) => (
          <div
            className={
              activeChat?.username === demoUser.username
                ? "chat-user active-chat"
                : "chat-user"
            }
            key={demoUser.username}
            onClick={() => setActiveChat(demoUser)}
          >
            <img src={demoUser.profilePic} alt="" />
            <div>
              <b>{demoUser.username}</b>
              <p>
                {(messages[demoUser.username] || []).slice(-1)[0]?.text ||
                  "Tap to chat"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="message-right chat-open">
        <div className="chat-top">
          <img src={activeChat.profilePic} alt="" />
          <div>
            <h3>{activeChat.username}</h3>
            <p>{activeChat.fullName}</p>
          </div>
        </div>

        <div className="chat-body">
          {sharedItems.length > 0 && (
            <div className="shared-preview-box">
              <b>Shared demo items</b>

              {sharedItems.slice(0, 3).map((item) => (
                <div className="shared-item" key={item.id}>
                  <img src={item.imageUrl} alt="" />
                  <div>
                    <p>
                      Shared {item.type} from <b>@{item.username}</b>
                    </p>
                    <span>{item.sharedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {chatMessages.length === 0 ? (
            <div className="message-empty">
              <div className="message-empty-icon">
                <FaRegPaperPlane />
              </div>
              <h2>Your messages</h2>
              <p>Send private messages to your friends.</p>
            </div>
          ) : (
            chatMessages.map((item) => (
              <div
                key={item.id}
                className={item.from === user.username ? "bubble me" : "bubble"}
              >
                <p>{item.text}</p>
                <span>{item.time}</span>
              </div>
            ))
          )}
        </div>

        <form className="chat-form" onSubmit={sendMessage}>
          <input
            placeholder="Message..."
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
          />
          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}

function NotificationsPage({ recentActivities }) {
  return (
    <div className="page-card">
      <h2>Notifications</h2>

      {recentActivities.length === 0 ? (
        <div className="empty-notification">
          <h3>No notifications yet</h3>
          <p>Follow users, like posts, comment, or share to see notifications here.</p>
        </div>
      ) : (
        recentActivities.map((notification) => (
          <div
            className="notification-item notification-list-item"
            key={notification.id}
          >
            <img
              src={
                notification.profilePic ||
                notification.imageUrl ||
                "https://i.pravatar.cc/150?img=12"
              }
              alt=""
            />

            <p>
              <b>{notification.type.replace("_", " ").toUpperCase()}</b>
              <br />
              {notification.text}
            </p>

            {notification.imageUrl && (
              <img
                className="notification-thumb"
                src={notification.imageUrl}
                alt=""
              />
            )}

            <span>{notification.time}</span>
          </div>
        ))
      )}
    </div>
  );
}

function HashtagsPage({
  allHashtags,
  allMentions,
  allTags,
  openHashtag,
  openMention,
  openTag
}) {
  return (
    <div className="page-card">
      <h2>Tags & Mentions</h2>

      <TagSection
        title="Hashtags"
        emptyText="No hashtags found. Add hashtags in post caption."
        items={allHashtags}
        icon={<FaHashtag />}
        cleanPrefix="#"
        onClick={openHashtag}
      />

      <TagSection
        title="Mentions"
        emptyText="No mentions found. Use @username in caption."
        items={allMentions}
        icon={<FaAt />}
        cleanPrefix="@"
        onClick={openMention}
      />

      <TagSection
        title="Tags"
        emptyText="No tags found. Use +username in caption."
        items={allTags}
        icon={<FaTag />}
        cleanPrefix="+"
        onClick={openTag}
      />
    </div>
  );
}

function PostListPage({
  title,
  subtitle,
  emptyTitle,
  emptyText,
  posts,
  user,
  savedIds,
  likePost,
  commentPost,
  deletePost,
  toggleSave,
  openHashtag,
  openMention,
  openTag,
  sharePost,
  setActivePost
}) {
  return (
    <>
      <div className="page-title">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      {posts.length === 0 ? (
        <EmptyState title={emptyTitle} text={emptyText} />
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            user={user}
            likePost={likePost}
            commentPost={commentPost}
            deletePost={deletePost}
            saved={savedIds.includes(post._id)}
            toggleSave={toggleSave}
            openHashtag={openHashtag}
            openMention={openMention}
            openTag={openTag}
            sharePost={sharePost}
            setActivePost={setActivePost}
          />
        ))
      )}
    </>
  );
}

function ProfilePage({
  user,
  myPosts,
  followingUsers,
  setShowProfileEdit,
  setActivePost
}) {
  return (
    <div className="profile-page">
      <div className="profile-top">
        <img src={user.profilePic} alt="" />

        <div>
          <div className="profile-title">
            <h2>{user.username}</h2>
            <button type="button" onClick={() => setShowProfileEdit(true)}>
              Edit profile
            </button>
          </div>

          <div className="profile-stats">
            <span>
              <b>{myPosts.length}</b> posts
            </span>
            <span>
              <b>{followingUsers.length}</b> following
            </span>
            <span>
              <b>{user.followers?.length || 0}</b> followers
            </span>
          </div>

          <h4>{user.fullName || "SocialGram User"}</h4>
          <p>{user.bio || "MERN stack social media project"}</p>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <div className="profile-tabs">
        <button type="button" className="active">
          POSTS
        </button>
        <button type="button">SAVED</button>
        <button type="button">TAGGED</button>
      </div>

      {myPosts.length === 0 ? (
        <EmptyState title="No posts" text="Your uploaded posts will appear here." />
      ) : (
        <div className="profile-grid">
          {myPosts.map((post) => (
            <img
              key={post._id}
              src={post.imageUrl}
              alt=""
              onClick={() => setActivePost(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CreateModal({
  createMode,
  setCreateMode,
  postForm,
  setPostForm,
  storyForm,
  setStoryForm,
  createPost,
  addStory,
  startCamera,
  handleGalleryImage,
  close
}) {
  const isPost = createMode === "post";
  const activeForm = isPost ? postForm : storyForm;
  const setActiveForm = isPost ? setPostForm : setStoryForm;

  return (
    <div className="modal-backdrop">
      <div className="create-modal">
        <div className="modal-head">
          <h3>Create</h3>
          <button type="button" onClick={close}>
            <FaTimes />
          </button>
        </div>

        <div className="create-tabs two-tabs">
          <button
            type="button"
            className={isPost ? "active" : ""}
            onClick={() => setCreateMode("post")}
          >
            Post
          </button>

          <button
            type="button"
            className={!isPost ? "active" : ""}
            onClick={() => setCreateMode("story")}
          >
            Story
          </button>
        </div>

        <form onSubmit={isPost ? createPost : addStory}>
          <div className={isPost ? "upload-box" : "upload-box story-upload-box"}>
            {activeForm.imageUrl ? (
              <img src={activeForm.imageUrl} alt="preview" />
            ) : (
              <>
                {isPost ? <FaImage /> : <FaPlay />}
                <p>
                  {isPost
                    ? "Select from gallery, use camera, or paste image URL"
                    : "Select story image"}
                </p>
              </>
            )}
          </div>

          <div className="upload-actions">
            <label className="gallery-btn">
              <FaImage /> Gallery
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleGalleryImage(e, isPost ? "post" : "story")}
              />
            </label>

            <button
              type="button"
              className="camera-btn"
              onClick={() => startCamera(isPost ? "post" : "story")}
            >
              <FaCamera /> Camera
            </button>
          </div>

          <input
            placeholder={isPost ? "Image URL" : "Story Image URL"}
            value={activeForm.imageUrl}
            onChange={(e) =>
              setActiveForm({ ...activeForm, imageUrl: e.target.value })
            }
          />

          <textarea
            placeholder={
              isPost
                ? "Write caption... use #hashtags @mentions +tags"
                : "Story caption... use #tag @mention +tag"
            }
            value={activeForm.caption}
            onChange={(e) =>
              setActiveForm({ ...activeForm, caption: e.target.value })
            }
          ></textarea>

          {isPost && (
            <div className="caption-help">
              <span>
                <FaHashtag /> Example: #travel #photo
              </span>
              <span>
                <FaAt /> Example: @arjun_dev @meera_art
              </span>
              <span>
                <FaTag /> Example: +travel_diary +food_spot
              </span>
            </div>
          )}

          <select
            value={activeForm.music}
            onChange={(e) =>
              setActiveForm({ ...activeForm, music: e.target.value })
            }
          >
            {musicList.map((music) => (
              <option key={music}>{music}</option>
            ))}
          </select>

          <button className="main-btn" type="submit">
            {isPost ? "Share" : "Upload Story"}
          </button>
        </form>
      </div>
    </div>
  );
}

function EditProfileModal({
  profileForm,
  setProfileForm,
  updateProfile,
  handleProfileImage,
  close
}) {
  return (
    <div className="modal-backdrop">
      <div className="create-modal small-modal">
        <div className="modal-head">
          <h3>Edit profile</h3>

          <button type="button" onClick={close}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={updateProfile}>
          <div className="dp-edit-box">
            <img
              src={profileForm.profilePic || "https://i.pravatar.cc/150?img=12"}
              alt="profile preview"
            />

            <label className="dp-upload-btn">
              <FaImage /> Change profile photo
              <input type="file" accept="image/*" onChange={handleProfileImage} />
            </label>

            <p>Select an image from local storage. No URL needed.</p>
          </div>

          <input
            placeholder="Full name"
            value={profileForm.fullName}
            onChange={(e) =>
              setProfileForm({ ...profileForm, fullName: e.target.value })
            }
          />

          <textarea
            placeholder="Bio"
            value={profileForm.bio}
            onChange={(e) =>
              setProfileForm({ ...profileForm, bio: e.target.value })
            }
          ></textarea>

          <button className="main-btn" type="submit">
            Save profile
          </button>
        </form>
      </div>
    </div>
  );
}

function StoryViewer({
  story,
  currentUser,
  close,
  deleteStory,
  storyReply,
  setStoryReply,
  storyComments,
  addStoryReply,
  shareStory,
  openHashtag,
  openMention,
  openTag
}) {
  const replies = storyComments[story.id] || [];
  const isMyStory = story.userId === currentUser._id;

  return (
    <div className="story-viewer">
      <button type="button" className="story-close" onClick={close}>
        <FaTimes />
      </button>

      <div className="story-view-card">
        <div className="story-view-top">
          <div>
            <img src={story.profilePic} alt="" />
            <b>{story.username}</b>
          </div>

          {isMyStory && (
            <button
              type="button"
              className="story-delete"
              onClick={() => deleteStory(story.id)}
            >
              <FaTrash />
            </button>
          )}
        </div>

        <img className="story-view-img" src={story.imageUrl} alt="" />

        {story.caption && (
          <p className="story-caption">
            {renderCaptionParts(story.caption, openHashtag, openMention, openTag)}
          </p>
        )}

        {story.music && story.music !== "No music" && (
          <p className="story-music">
            <FaMusic /> {story.music}
          </p>
        )}

        <div className="story-replies">
          {replies.slice(-3).map((reply) => (
            <p key={reply.id}>
              <b>{reply.user}</b> {reply.text}
            </p>
          ))}
        </div>

        <div className="story-actions-row">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addStoryReply(story.id);
            }}
          >
            <input
              placeholder="Reply to story..."
              value={storyReply}
              onChange={(e) => setStoryReply(e.target.value)}
            />

            <button type="submit">
              <FaPaperPlane />
            </button>
          </form>

          <button type="button" onClick={() => shareStory(story)}>
            <FaShare />
          </button>
        </div>
      </div>
    </div>
  );
}

function PostViewer({
  post,
  user,
  close,
  likePost,
  commentPost,
  saved,
  toggleSave,
  openHashtag,
  openMention,
  openTag,
  sharePost
}) {
  const [comment, setComment] = useState("");
  const liked = post.likes?.some((id) => id === user._id);

  function submitComment(e) {
    e.preventDefault();
    commentPost(post._id, comment);
    setComment("");
  }

  return (
    <div className="modal-backdrop">
      <div className="post-viewer">
        <button type="button" className="viewer-close" onClick={close}>
          <FaTimes />
        </button>

        <div className="viewer-image-side">
          <img src={post.imageUrl} alt="" />
        </div>

        <div className="viewer-info-side">
          <div className="post-top">
            <div className="post-user">
              <img src={post.user?.profilePic} alt="" />
              <div>
                <b>{post.user?.username}</b>
                <p>{post.user?.fullName || "SocialGram user"}</p>
              </div>
            </div>
          </div>

          <p className="caption viewer-caption">
            <b>{post.user?.username}</b>{" "}
            {renderCaptionParts(post.caption, openHashtag, openMention, openTag)}
          </p>

          <div className="viewer-comments">
            {(post.comments || []).map((item) => (
              <p key={item._id || item.id}>
                <b>{item.user?.username}</b> {item.text}
              </p>
            ))}
          </div>

          <div className="post-actions viewer-actions">
            <div>
              <button type="button" onClick={() => likePost(post._id)}>
                {liked ? <FaHeart className="liked" /> : <FaRegHeart />}
              </button>

              <button type="button">
                <FaComment />
              </button>

              <button type="button" onClick={() => sharePost(post)}>
                <FaRegPaperPlane />
              </button>
            </div>

            <button type="button" onClick={() => toggleSave(post._id)}>
              {saved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>

          <p className="likes viewer-likes">{post.likes?.length || 0} likes</p>

          <form className="comment-form" onSubmit={submitComment}>
            <FaSmile />
            <input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function CameraModal({ videoRef, canvasRef, capturePhoto, close }) {
  return (
    <div className="modal-backdrop">
      <div className="camera-modal">
        <div className="modal-head">
          <h3>Camera</h3>

          <button type="button" onClick={close}>
            <FaTimes />
          </button>
        </div>

        <video ref={videoRef} autoPlay playsInline></video>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

        <button className="capture-btn" type="button" onClick={capturePhoto}>
          <FaCamera /> Capture Photo
        </button>
      </div>
    </div>
  );
}

function MoreMenu({
  close,
  openSettings,
  goSaved,
  goNotifications,
  logout
}) {
  return (
    <div className="more-backdrop" onClick={close}>
      <div className="more-menu" onClick={(e) => e.stopPropagation()}>
        <div className="more-menu-head">
          <h3>More</h3>

          <button type="button" onClick={close}>
            <FaTimes />
          </button>
        </div>

        <button type="button" onClick={openSettings}>
          Settings
        </button>

        <button type="button" onClick={goNotifications}>
          Notifications
        </button>

        <button type="button" onClick={goSaved}>
          Saved
        </button>

        <button type="button">Privacy</button>
        <button type="button">Your activity</button>
        <button type="button">Appearance: Light mode</button>

        <button type="button" className="logout-menu-btn" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}

function SettingsModal({
  close,
  user,
  followingUsers,
  savedIds,
  recentActivities,
  clearDemoData,
  openEditProfile
}) {
  return (
    <div className="modal-backdrop">
      <div className="settings-modal">
        <div className="modal-head">
          <h3>Settings</h3>

          <button type="button" onClick={close}>
            <FaTimes />
          </button>
        </div>

        <div className="settings-profile-card">
          <img src={user.profilePic} alt="" />

          <div>
            <h3>{user.username}</h3>
            <p>{user.fullName || "SocialGram User"}</p>
          </div>

          <button type="button" onClick={openEditProfile}>
            Edit
          </button>
        </div>

        <div className="settings-stats">
          <div>
            <b>{followingUsers.length}</b>
            <span>Following</span>
          </div>

          <div>
            <b>{savedIds.length}</b>
            <span>Saved</span>
          </div>

          <div>
            <b>{recentActivities.length}</b>
            <span>Activities</span>
          </div>
        </div>

        <div className="settings-list">
          <button type="button">Account privacy</button>
          <button type="button">Saved posts</button>
          <button type="button">Close friends</button>
          <button type="button">Notification preferences</button>
          <button type="button">About SocialGram</button>
        </div>

        <button
          type="button"
          className="danger-setting-btn"
          onClick={clearDemoData}
        >
          Clear demo local data
        </button>
      </div>
    </div>
  );
}

function RightPanel({
  user,
  logout,
  openCreate,
  followingUsers,
  toggleFollow
}) {
  return (
    <section className="right-panel">
      <div className="right-user">
        <img src={user.profilePic} alt="" />

        <div>
          <b>{user.username}</b>
          <p>{user.fullName || "SocialGram User"}</p>
        </div>

        <button type="button" onClick={logout}>
          Switch
        </button>
      </div>

      <button type="button" className="quick-create" onClick={openCreate}>
        <FaPlusCircle /> Quick Create
      </button>

      <div className="suggest-head">
        <b>Suggested for you</b>
        <button type="button">See All</button>
      </div>

      {demoUsers.slice(0, 10).map((demoUser) => {
        const isFollowing = followingUsers.includes(demoUser.username);

        return (
          <div className="suggest-user" key={demoUser.username}>
            <img src={demoUser.profilePic} alt="" />

            <div>
              <b>{demoUser.username}</b>
              <p>{isFollowing ? "Following you demo" : "Suggested for you"}</p>
            </div>

            <button
              type="button"
              className={isFollowing ? "following-text-btn" : ""}
              onClick={() => toggleFollow(demoUser)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        );
      })}

      <p className="footer-note">
        About · Help · Press · API · Jobs · Privacy · Terms · Locations · Meta Verified
      </p>
      <div></div>
      <p className="footer-note">
        © 2026 SocialGram from Meta
      </p>
    </section>
  );
}

export default App;
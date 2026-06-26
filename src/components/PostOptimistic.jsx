import { useEffect, useRef, useState } from "react";
import { updatePost, getPost as getPostById } from "../server/postsApi";
import Skeleton from "./Skeleton";
import ErrorNotification from "./ErrorNotification";
import {
  LuBadgeCheck,
  LuBookmark,
  LuHeart,
  LuMessageCircle,
  LuSend,
  LuEllipsis,
} from "react-icons/lu";

// Fake static data — no server, no loader, nothing!
const fakePost = {
  id: "7",
  username: "john_doe",
  verified: true,
  postDate: "2 hours ago",
  userImg: "https://i.pravatar.cc/300?img=44",
  postImg: "https://picsum.photos/id/67/500/300",
  post: "Exploring the beauty of the world one photo at a time. #travel #photography #nature",
  postLikes: 147,
  postBookmarks: 28,
  postComments: 15,
  postLiked: false,
  postBookmarked: false,
};

console.log("📦 MODULE LOADED"); // To debug the component phases to make sure it is NOT being unmounted!

// Fake server call — simulates network delay and random failures
function fakeServerCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.4; // fails 40% of the time
      if (shouldFail) {
        reject(new Error("Server failed! 💥"));
      } else {
        resolve("Success! ✅");
      }
    }, 1500); // 1.5 second delay
  });
}

// Post component 🧩
function PostOptimistic() {
  // State 🧠
  const [isLoading, setIsLoading] = useState(true); // ← starts as true!
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(fakePost.postLikes);
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [bookmarksCount, setBookmarksCount] = useState(fakePost.bookmarksCount);

  // Destructuring 🌿
  const {
    id,
    username,
    verified,
    postDate,
    userImg,
    postImg,
    post: postTxt,
    postLikes,
    postBookmarks,
    postComments,
    postLiked,
  } = fakePost;

  // Freeze the current states 🧊
  const frozenLiked = useRef(null);
  const frozenLikesCount = useRef(null);
  const frozenBookmarked = useRef(null);
  const frozenBookmarksCount = useRef(null);

  // Effect 🌀
  useEffect(function () {
    // Reset global states
    setIsLoading(true);
    setShowError(false);
    setError("");

    console.log("Mounted...");

    // Async
    async function getPost() {
      try {
        const res = await fetch("http://localhost:8001/posts/7");
        if (!res.ok) throw new Error("Failed to fetch data 😥");
        const data = await res.json();

        // OLD way 👇 - still works ✅
        // const data = await getPostById(7); // {...}

        // Update states with REAL server data
        setBookmarksCount(data?.postBookmarks);
        setIsBookmarked(data?.postBookmarked);
        setIsLiked(data?.postLiked);
        setLikesCount(data?.postLikes);

        // reset loading state
        setIsLoading(false);
      } catch (err) {
        // reset states
        setIsLoading(false);
        setShowError(true);
        setError(err?.message || "Something went wrong...");
      }
    }

    // Call async func
    getPost();

    return () => {
      console.log("Unmounted...");
    };
  }, []);

  // Handlers 🖱️
  async function handleLikes() {
    // Snapshot of states
    frozenLiked.current = isLiked;
    frozenLikesCount.current = likesCount;

    const liked = isLiked ? false : true;
    const likes = isLiked ? likesCount - 1 : likesCount + 1;

    // 0. Update likes state
    // setIsLiked((liked) => !liked);
    setIsLiked(liked);

    // 1. Update the likes count state
    // setLikesCount((curr) => {
    //   return isLiked ? curr - 1 : curr + 1;
    // });
    setLikesCount(likes);

    // 3. Send data to the server
    try {
      //   await fakeServerCall();
      await updatePost(id, {
        // postLiked: isLiked ? false : true,
        // postLikes: isLiked ? likesCount - 1 : likesCount + 1,
        postLiked: liked,
        postLikes: likes,
      });
      console.log("Success ✅");
    } catch (err) {
      console.error(err);
      console.log("Server failed! 💥");

      // Roll back when server fails
      setIsLiked(frozenLiked.current);
      setLikesCount(frozenLikesCount.current);
      setShowError(err.message);
    }
  }

  async function handleBookmarks() {
    // Snapshot of state
    frozenBookmarked.current = isBookmarked;
    frozenBookmarksCount.current = bookmarksCount;

    // 0. Update bookmark state
    setIsBookmarked((bookmarked) => !bookmarked);

    // 1. Update the bookmarks count state
    setBookmarksCount((curr) => {
      return isBookmarked ? curr - 1 : curr + 1;
    });

    // 3. Send data to the server
    try {
      //   await fakeServerCall();
      await updatePost(id, {
        postBookmarks: isBookmarked ? bookmarksCount - 1 : bookmarksCount + 1,
        postBookmarked: !isBookmarked,
      });
      console.log("Success ✅");
    } catch (err) {
      console.error(err);
      console.log("Server failed! 💥");

      // Roll back when server fails
      setIsBookmarked(frozenBookmarked.current);
      setBookmarksCount(frozenBookmarksCount.current);
      setShowError(err.message);
    }
  }

  // Loading...
  if (isLoading) return <Skeleton />;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-900">
      {/* Error Notification */}
      {showError && (
        <ErrorNotification error={error} setShowError={setShowError} />
      )}

      {/* Post */}
      <div className="flex w-105 flex-col items-center justify-center gap-2 rounded-lg border border-[#262626] bg-neutral-800 p-3">
        {/* Profile */}
        <div className="flex h-full w-full items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#262626]">
              <img draggable="false" src={userImg} alt="" />
            </div>

            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center justify-center gap-1">
                <h4 className="text-sm font-semibold text-[#f5f5f5]">
                  {username}
                </h4>

                {verified && (
                  <LuBadgeCheck className="h-4 w-4 fill-[#0095f6] text-white" />
                )}
              </div>

              <p className="text-xs text-[#a8a8a8]">{postDate}</p>
            </div>
          </div>

          <span className="inline-block rotate-90 cursor-pointer text-[#f5f5f5]">
            <LuEllipsis />
          </span>
        </div>

        {/* Post Text */}
        <div className="my-2 w-full">
          <p className="text-sm text-[#f5f5f5]">{highlightHashtags(postTxt)}</p>
        </div>

        {/* Post Image */}
        <div className="flex w-full items-center justify-center overflow-hidden rounded-lg border border-[#262626]">
          <img
            className="w-full object-contain"
            draggable="false"
            src={postImg}
            alt=""
          />
        </div>

        {/* Stats */}
        <div className="mt-2 flex w-full items-center justify-between gap-2 px-2">
          <div className="flex items-center justify-between gap-4">
            {/* Likes */}
            <button
              type="button"
              className="flex items-center justify-center gap-1 text-[#f5f5f5]"
              onClick={handleLikes}
            >
              <LuHeart
                className={`${isLiked ? "fill-[#ed4956] stroke-[#ed4956]" : ""} cursor-pointer`}
              />
              <h5 className="text-xs font-semibold text-[#f5f5f5]">
                {likesCount}
              </h5>
            </button>

            {/* Comments */}
            <button
              type="button"
              className="flex items-center justify-center gap-1 text-[#f5f5f5]"
            >
              <LuMessageCircle className="cursor-pointer" />
              <h5 className="text-xs font-semibold text-[#f5f5f5]">
                {postComments}
              </h5>
            </button>

            {/* Bookmarks */}
            <button
              type="button"
              className="flex items-center justify-center gap-1 text-[#f5f5f5]"
              onClick={handleBookmarks}
            >
              <LuBookmark
                className={`${isBookmarked ? "fill-[#0095f6] stroke-[#0095f6]" : ""} cursor-pointer`}
              />
              <h5 className="text-xs font-semibold text-[#f5f5f5]">
                {bookmarksCount}
              </h5>
            </button>
          </div>

          {/* Share */}
          <button type="button" className="cursor-pointer text-[#f5f5f5]">
            <LuSend />
          </button>
        </div>
      </div>
    </div>
  );
}

// Highlight hashtags
export function highlightHashtags(post) {
  return post.split(" ").map((word, index) => {
    const searchTerm = encodeURIComponent(word);

    return word.startsWith("#") ? (
      <a
        key={index}
        href={`https://www.google.com/search?q=${searchTerm}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {word}{" "}
      </a>
    ) : (
      word + " "
    );
  });
}

export default PostOptimistic;

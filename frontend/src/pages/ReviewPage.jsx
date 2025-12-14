import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { ContentContext } from "../context/ContentContext";
import { Star, MessageSquare, User, Mail, Calendar, Camera, X, Send, ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "../components/Loader";
import { useScrollReveal } from "../animation/useScrollReveal";
import Footer from "../components/homecomponents/Footer";

const ReviewPage = () => {
  const { reviewContent, loadingReview, loadPageContent } = useContext(ContentContext);

  const [currentReview, setCurrentReview] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState(0);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 5,
    title: "",
    content: "",
    images: [],
  });
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const titleRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const featuredRef = useScrollReveal();
  const formRef = useScrollReveal();
  const listRef = useScrollReveal();

  // Load page content on mount
  useEffect(() => {
    loadPageContent("review");
  }, [loadPageContent]);

  const testimonials = reviewContent?.reviewPage?.testimonials || [];
  const allReviews = useMemo(() => {
    return [...testimonials, ...submittedReviews];
  }, [testimonials, submittedReviews]);

  const featuredReview = useMemo(() => {
    return allReviews[currentReview] || {};
  }, [allReviews, currentReview]);

  // Carousel autoplay
  useEffect(() => {
    if (!autoplay || allReviews.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % allReviews.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, allReviews.length]);

  // Navigate carousel
  const goToPrevious = useCallback(() => {
    setCurrentReview((prev) => (prev - 1 + allReviews.length) % allReviews.length);
  }, [allReviews.length]);

  const goToNext = useCallback(() => {
    setCurrentReview((prev) => (prev + 1) % allReviews.length);
  }, [allReviews.length]);

  // Handle review form input change
  const handleReviewChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [formErrors]);

  const handleRatingClick = useCallback((rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  }, []);

  // Single image upload
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, or WebP).");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setNewReview((prev) => ({ ...prev, images: [file] }));
  }, []);

  const handleRemoveImage = useCallback(() => {
    setNewReview((prev) => ({ ...prev, images: [] }));
    const fileInput = document.getElementById("image-upload");
    if (fileInput) fileInput.value = "";
  }, []);

  // Validate form
  const validateForm = useCallback(() => {
    const errors = {};
    
    if (!newReview.name.trim()) errors.name = "Name is required";
    if (!newReview.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newReview.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!newReview.content.trim()) errors.content = "Review content is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [newReview]);

  const handleSubmitReview = useCallback((e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    const reviewToAdd = {
      ...newReview,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      role: "Customer",
      avatar: newReview.images[0] ? URL.createObjectURL(newReview.images[0]) : null,
    };

    setTimeout(() => {
      setSubmittedReviews((prev) => [reviewToAdd, ...prev]);
      setNewReview({ 
        name: "", 
        email: "", 
        rating: 5, 
        title: "", 
        content: "", 
        images: [] 
      });
      setFormErrors({});
      setCurrentReview(0);
      setIsSubmitting(false);
    }, 1000);
  }, [newReview, validateForm]);

  // Review stats
  const reviewStats = useMemo(() => {
    const totalReviews = allReviews.length;
    const averageRating = totalReviews
      ? (allReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / totalReviews).toFixed(1)
      : "0.0";
    
    const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
      const stars = 5 - i;
      const count = allReviews.filter((r) => r.rating === stars).length;
      return { 
        stars, 
        count, 
        percentage: totalReviews ? (count / totalReviews) * 100 : 0 
      };
    });

    return { totalReviews, averageRating, ratingDistribution };
  }, [allReviews]);

  // Sort & filter reviews
  const sortedAndFilteredReviews = useMemo(() => {
    return allReviews
      .filter((r) => filterRating === 0 || r.rating === filterRating)
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.date || 0) - new Date(a.date || 0);
        }
        if (sortBy === "highest") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "lowest") return (a.rating || 0) - (b.rating || 0);
        if (sortBy === "most-liked") return (b.likes || 0) - (a.likes || 0);
        return 0;
      });
  }, [allReviews, filterRating, sortBy]);

  const renderStars = useCallback((rating) => {
    const starRating = rating || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < starRating 
            ? "fill-yellow-400 text-yellow-400" 
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  }, []);

  if (loadingReview) return <Loader />;

  if (!reviewContent?.reviewPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Error loading Review Page data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lime-50">
      {/* Hero Section */}
      <section className="bg-gray-900 py-16 lg:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <h1 
            ref={titleRef} 
            className="scroll-reveal opacity-0 translate-y-8 text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Customer Reviews
          </h1>
          <p className="text-lime-100 text-lg lg:text-xl max-w-3xl mx-auto">
            See what our customers say about our products and services
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div 
            ref={statsRef} 
            className="scroll-reveal opacity-0 translate-y-8 bg-white rounded-3xl p-8 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Average Rating */}
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {reviewStats.averageRating}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(parseFloat(reviewStats.averageRating)))}
                </div>
                <p className="text-gray-600">Average Rating</p>
              </div>
              
              {/* Total Reviews */}
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {reviewStats.totalReviews}
                </div>
                <div className="text-lime-400 mb-2">
                  <MessageSquare className="w-8 h-8 mx-auto" />
                </div>
                <p className="text-gray-600">Total Reviews</p>
              </div>
              
              {/* Rating Breakdown */}
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 mb-4">Rating Breakdown</h3>
                {reviewStats.ratingDistribution.map(({ stars, count, percentage }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-8">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-lime-400 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${percentage}%` }} 
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto lg:px-16 grid lg:grid-cols-3 gap-8">
          {/* Featured Reviews & All Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Review */}
            <div 
              ref={featuredRef} 
              className="scroll-reveal opacity-0 translate-y-8 bg-white rounded-3xl p-4 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Featured Review</h2>
                {allReviews.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAutoplay(!autoplay)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        autoplay 
                          ? "bg-lime-100 text-lime-700" 
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {autoplay ? "Pause" : "Play"} Auto
                    </button>
                    <button
                      onClick={goToPrevious}
                      className="p-2 rounded-full bg-lime-100 text-lime-700 hover:bg-lime-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="p-2 rounded-full bg-lime-100 text-lime-700 hover:bg-lime-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {allReviews.length > 0 ? (
                <div className="bg-lime-50 rounded-2xl p-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{featuredReview.content || "No review content available"}"
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(featuredReview.rating)}
                    <span className="text-gray-600 ml-2">
                      {featuredReview.rating ? `${featuredReview.rating}.0` : "No rating"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-lime-100 border-4 border-white">
                      {featuredReview.avatar ? (
                        <img 
                          src={featuredReview.avatar} 
                          alt={featuredReview.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <User className="w-8 h-8 text-lime-600 mx-auto mt-4" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {featuredReview.name || "Anonymous"}
                      </h3>
                      <p className="text-gray-600">{featuredReview.email || "Customer"}</p>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {featuredReview.date ? new Date(featuredReview.date).toLocaleDateString() : "Recently"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-8 text-center">
                  <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
              
              {/* Carousel Indicators */}
              {allReviews.length > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {allReviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReview(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentReview 
                          ? "bg-lime-500 w-4" 
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* All Reviews */}
            <div 
              ref={listRef} 
              className="scroll-reveal opacity-0 translate-y-8 bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  All Reviews ({allReviews.length})
                </h2>
                <div className="flex flex-wrap gap-4">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)} 
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                  >
                    <option value="newest">Newest First</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                    <option value="most-liked">Most Liked</option>
                  </select>
                  <select 
                    value={filterRating} 
                    onChange={(e) => setFilterRating(Number(e.target.value))} 
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                  >
                    <option value="0">All Ratings</option>
                    <option value="5">★★★★★</option>
                    <option value="4">★★★★☆</option>
                    <option value="3">★★★☆☆</option>
                    <option value="2">★★☆☆☆</option>
                    <option value="1">★☆☆☆☆</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {sortedAndFilteredReviews.length > 0 ? (
                  sortedAndFilteredReviews.map((review, idx) => (
                    <div 
                      key={review.id || idx} 
                      className="border-b border-gray-200 pb-6 last:border-0"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0">
                            {review.avatar ? (
                              <img 
                                src={review.avatar} 
                                alt={review.name} 
                                className="w-full h-full rounded-full object-cover" 
                              />
                            ) : (
                              <User className="w-6 h-6 text-lime-600" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-gray-900 truncate">
                              {review.name || "Anonymous"}
                            </h3>
                            <p className="text-gray-600 text-sm">{review.email || "Customer"}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              <span className="text-gray-500 text-sm">
                                {review.date ? new Date(review.date).toLocaleDateString() : "Recently"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {review.title && (
                        <h4 className="font-bold text-gray-900 mb-2">
                          {review.title}
                        </h4>
                      )}
                      <p className="text-gray-700 whitespace-pre-line">
                        {review.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      {filterRating > 0 
                        ? `No reviews with ${filterRating} star rating` 
                        : "No reviews yet"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Review Form */}
          <div ref={formRef} className="scroll-reveal opacity-0 translate-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Share Your Experience
              </h2>
              <form onSubmit={handleSubmitReview} className="space-y-6" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lime-400" />
                    <input
                      type="text"
                      name="name"
                      value={newReview.name}
                      onChange={handleReviewChange}
                      required
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                        formErrors.name 
                          ? "border-red-300 focus:ring-red-400" 
                          : "border-lime-200 focus:ring-lime-400"
                      } focus:outline-none focus:ring-2 focus:border-transparent`}
                      placeholder="John Farmer"
                    />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lime-400" />
                    <input
                      type="email"
                      name="email"
                      value={newReview.email}
                      onChange={handleReviewChange}
                      required
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                        formErrors.email 
                          ? "border-red-300 focus:ring-red-400" 
                          : "border-lime-200 focus:ring-lime-400"
                      } focus:outline-none focus:ring-2 focus:border-transparent`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className={`p-1 transition-transform hover:scale-110 ${
                          newReview.rating >= star 
                            ? "text-yellow-400" 
                            : "text-gray-300"
                        }`}
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            newReview.rating >= star ? "fill-yellow-400" : ""
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-gray-600">{newReview.rating}.0</span>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Upload Photos
                  </label>
                  <input 
                    type="file" 
                    id="image-upload" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-lime-300 rounded-2xl cursor-pointer bg-lime-50 hover:bg-lime-100 transition-colors duration-200"
                  >
                    <Camera className="w-10 h-10 text-lime-400 mb-3" />
                    <p className="mb-1 text-sm text-gray-700 font-medium">
                      <span className="text-lime-500">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG or WEBP (Max. 5MB each)
                    </p>
                  </label>
                  {newReview.images.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Preview ({newReview.images.length})
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {newReview.images.map((image, idx) => (
                          <div key={idx} className="relative group">
                            <div className="aspect-square rounded-xl overflow-hidden border border-lime-200">
                              <img 
                                src={URL.createObjectURL(image)} 
                                alt={`Preview ${idx + 1}`} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <button 
                              type="button" 
                              onClick={handleRemoveImage} 
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                              aria-label="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Your Review
                  </label>
                  <textarea 
                    name="content" 
                    value={newReview.content} 
                    onChange={handleReviewChange} 
                    required 
                    rows="6" 
                    className={`w-full px-4 py-3 rounded-xl border ${
                      formErrors.content 
                        ? "border-red-300 focus:ring-red-400" 
                        : "border-lime-200 focus:ring-lime-400"
                    } focus:outline-none focus:ring-2 focus:border-transparent`} 
                    placeholder="Share your experience with our products..." 
                  />
                  {formErrors.content && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`w-full bg-gradient-to-r from-lime-400 to-lime-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    isSubmitting 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:shadow-lg hover:from-lime-500 hover:to-lime-600"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )} 
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReviewPage;
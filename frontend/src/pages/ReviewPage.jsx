import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Star,
  MessageSquare,
  User,
  Mail,
  Camera,
  X,
  Send,
  ChevronLeft,
  ChevronRight,
  Upload,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { useScrollReveal } from "../animation/useScrollReveal";
import Footer from "../components/homecomponents/Footer";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

/* ===================== COMPONENT ===================== */
const ReviewPage = () => {
  // Static testimonials for fallback
  const staticTestimonials = [
    {
      id: 1,
      name: "Michael Rodriguez",
      email: "michaelrod@gmail.com",
      content: "The quality of chicks we received was exceptional. 98% survival rate and they're thriving. Best poultry supplier we've worked with in 15 years of farming.",
      rating: 5,
      avatar: "/assets/avatar1.jfif",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "john123sarah@gmail.com",
      content: "Their commitment to animal welfare and organic practices aligns perfectly with our values. The eggs are consistently fresh and customers love them.",
      rating: 5,
      avatar: "/assets/avatar2.jfif",
    },
    {
      id: 3,
      name: "Felix Oteng",
      email: "ultimate90@gmail.com",
      content: "I really like your website interface it is really nice, catchy and easily navigated. Your products are all quality, I really loved the chicken meat.",
      rating: 5,
      avatar: "/assets/avatar3.jfif",
    },
  ];

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [autoplay] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
    image: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const titleRef = useScrollReveal();
  const featuredRef = useScrollReveal();
  const formRef = useScrollReveal();

  // Combine static testimonials with fetched reviews
  const allReviews = useMemo(() => {
    return [...staticTestimonials, ...reviews];
  }, [reviews]);

  const featuredReview = allReviews[currentReview];

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/get-review`);
        if (res.data && res.data.reviews) {
          setReviews(res.data.reviews);
        }
      } catch (err) {
        console.error("Error fetching reviews: ", err);
        // If API fails, use empty array
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (!autoplay || allReviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % allReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, allReviews.length]);

  const goToNext = () =>
    setCurrentReview((prev) => (prev + 1) % allReviews.length);
  const goToPrevious = () =>
    setCurrentReview((prev) =>
      prev === 0 ? allReviews.length - 1 : prev - 1
    );

  const renderStars = (rating = 0) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  /* ================= FORM HANDLERS ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

     if (!formData.image) {
    alert("Please upload a profile picture");
    return;
  }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setSubmitting(true);
      
      // Prepare form data for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('content', formData.message);
      formDataToSend.append('rating', formData.rating.toString());
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      // Submit review to API
      const response = await axios.post(
        `${API_URL}/Create-review`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data && response.data.review) {
        // Add new review to state
        setReviews(prev => [response.data.review, ...prev]);
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          rating: 5,
          message: "",
          image: null,
        });
        setAvatarPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Switch to the new review
        setCurrentReview(0);
        setCurrentPage(1); // Reset to first page

        alert('Thank you for your review! It has been submitted successfully.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= PAGINATION ================= */
  // Calculate pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        endPage = maxPagesToShow;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxPagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lime-50">
  {/* HERO */}
  <section className="bg-gray-900 py-16 text-center">
    <h1
      ref={titleRef}
      className="scroll-reveal opacity-0 translate-y-8 text-4xl font-bold text-white"
    >
      What They're Saying
    </h1>
    <p className="text-lime-100 mt-3">
      Real feedback from customers who trust us
    </p>
  </section>

  {/* MAIN CONTENT */}
  <section className="py-12 max-w-7xl mx-auto px-4">
    <div className="grid lg:grid-cols-3 gap-8">
      {/* LEFT COLUMN - FEATURED REVIEWS & ALL REVIEWS */}
      <div className="lg:col-span-2 space-y-8">
        {/* FEATURED REVIEW */}
        <div
          ref={featuredRef}
          className="scroll-reveal opacity-0 translate-y-8 bg-white rounded-3xl p-6 md:p-8 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Featured Review</h2>
            <div className="flex gap-2">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-lime-100 hover:bg-lime-200 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-lime-100 hover:bg-lime-200 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bg-lime-50 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-lime-600"></div>
                <p className="mt-2 text-gray-600">Loading reviews...</p>
              </div>
            </div>
          ) : allReviews.length > 0 ? (
            <div className="bg-lime-50 rounded-2xl p-6 md:p-8">
              <p className="italic text-base md:text-lg mb-4">
                "{featuredReview.content}"
              </p>

              <div className="flex items-center gap-2 mb-4">
                {renderStars(featuredReview.rating)}
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={featuredReview.image || "/assets/default-avatar.png"}
                  alt={featuredReview.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white"
                  onError={(e) => {
                    e.target.src = "/assets/default-avatar.png";
                  }}
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-sm md:text-base truncate">{featuredReview.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 truncate">
                    {featuredReview.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-lime-50 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-gray-600 text-center">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}

          {/* DOTS INDICATOR */}
          {allReviews.length > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {allReviews.slice(0, 10).map((_, index) => ( // Limit dots for mobile
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentReview
                      ? "bg-lime-500 w-4 md:w-6"
                      : "bg-gray-300 w-2"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
              {allReviews.length > 10 && (
                <span className="text-xs text-gray-500 self-center px-2">
                  +{allReviews.length - 10}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ALL REVIEWS SECTION */}
        {allReviews.length > 0 && (
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-6">All Reviews</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-lime-600"></div>
                  <p className="mt-2 text-gray-600">Loading reviews...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {currentReviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-lime-50 rounded-2xl p-4 md:p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm md:text-base">
                        "{review.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={review.image || "/assets/default-avatar.png"}
                          alt={review.name}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white"
                          onError={(e) => {
                            e.target.src = "/assets/default-avatar.png";
                          }}
                        />
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm md:text-base truncate">{review.name}</h4>
                          <p className="text-xs text-gray-500 truncate">{review.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION CONTROLS */}
                {totalPages > 1 && (
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600 text-center sm:text-left">
                      Showing {indexOfFirstReview + 1} to {Math.min(indexOfLastReview, allReviews.length)} of {allReviews.length} reviews
                    </div>
                    
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="p-1 md:p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="First page"
                      >
                        <ChevronFirst className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-1 md:p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      
                      <div className="flex gap-1">
                        {renderPageNumbers().map((pageNumber) => (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-medium text-sm md:text-base ${
                              currentPage === pageNumber
                                ? "bg-lime-600 text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                            aria-label={`Page ${pageNumber}`}
                          >
                            {pageNumber}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-1 md:p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="p-1 md:p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Last page"
                      >
                        <ChevronLast className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN - REVIEW FORM */}
      <div className="lg:col-span-1">
        <div
          ref={formRef}
          className="scroll-reveal opacity-0 translate-y-8 bg-white rounded-3xl p-6 md:p-8 shadow-lg sticky top-8"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-6">Share Your Experience</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all text-sm md:text-base"
                placeholder="Enter your full name"
                required
                disabled={submitting}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all text-sm md:text-base"
                placeholder="your.email@example.com"
                required
                disabled={submitting}
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Star className="w-4 h-4" />
                Your Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => !submitting && handleRatingChange(star)}
                    disabled={submitting}
                    className="p-1 hover:scale-110 transition-transform disabled:hover:scale-100"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-6 h-6 md:w-8 md:h-8 ${
                        star <= formData.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {formData.rating} out of 5 stars
              </p>
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Camera className="w-4 h-4" />
                Profile Picture
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                    {avatarPreview ? (
                      <>
                        <img
                          src={avatarPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveAvatar}
                          disabled={submitting}
                          className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 disabled:opacity-50 text-xs"
                          aria-label="Remove photo"
                        >
                          <X className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </>
                    ) : (
                      <User className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1 w-full">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                    id="avatar-upload"
                    disabled={submitting}
                    required
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl cursor-pointer transition-colors w-full text-sm md:text-base ${
                      submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    <span>
                      {avatarPreview ? 'Change photo' : 'Upload photo'}
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 text-center sm:text-left">
                    JPEG, PNG or GIF (Max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4" />
                Your Review *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all text-sm md:text-base"
                placeholder="Share your experience with our products..."
                required
                disabled={submitting}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-lime-600 text-white py-3 rounded-xl font-medium hover:bg-lime-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {submitting ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                  Submit Review
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Your review will be publicly displayed on our website
            </p>
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

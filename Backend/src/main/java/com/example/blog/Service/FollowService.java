package com.example.blog.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.blog.Entity.Followers;
import com.example.blog.Entity.User;
import com.example.blog.Repository.FollowRepository;
import com.example.blog.Repository.UserRepository;

@Service
@Transactional
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Follow a user
     */
    public Map<String, Object> followUser(@NonNull Long followerId, @NonNull Long followedUserId) {
        Map<String, Object> response = new HashMap<>();

        // Validate follower exists
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new ResponseStatusException(
    HttpStatus.NOT_FOUND,
    "User not found"));


        // Validate followed user exists
        User followed = userRepository.findById(followedUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Prevent self-follow
        if (followerId.equals(followedUserId)) {
            throw new RuntimeException("Cannot follow yourself");
        }

        // Check if already following
        if (followRepository.existsByFollowerIdAndFollowedId(followerId, followedUserId)) {
            throw new RuntimeException("Already following this user");
        }

        // Create follow relationship
        Followers follow = new Followers();
        follow.setFollower(follower);
        follow.setFollowed(followed);
        Followers savedFollow = followRepository.save(follow);

        // Build response map
        response.put("success", true);
        response.put("message", "Successfully followed user");
        response.put("followId", savedFollow.getId());
        response.put("followerId", follower.getId());
        response.put("followerName", follower.getName());
        response.put("followedId", followed.getId());
        response.put("followedName", followed.getName());
        response.put("isFollowing", true);

        return response;
    }

    /**
     * Unfollow a user
     */
    public Map<String, String> unfollowUser(@NonNull Long followerId, @NonNull Long followedUserId) {
        Map<String, String> response = new HashMap<>();

        // Check if follow relationship exists
        if (!followRepository.existsByFollowerIdAndFollowedId(followerId, followedUserId)) {
            throw new RuntimeException("Not following this user");
        }

        // Delete follow relationship
        followRepository.deleteByFollowerIdAndFollowedId(followerId, followedUserId);

        response.put("success", "true");
        response.put("message", "Successfully unfollowed user");
        return response;
    }

    /**
     * Check if user is following another user
     */
    public boolean isFollowing(@NonNull Long followerId, @NonNull Long followedId) {
        return followRepository.existsByFollowerIdAndFollowedId(followerId, followedId);
    }

    /**
     * Get list of users that a user is following
     */
    public List<Map<String, Object>> getFollowingList(@NonNull Long userId) {
        List<Followers> following = followRepository.findByFollowerId(userId);
        List<Map<String, Object>> followingList = new ArrayList<>();

        for (Followers follow : following) {
            User followedUser = follow.getFollowed();
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", followedUser.getId());
            userMap.put("name", followedUser.getName());
            userMap.put("email", followedUser.getEmailId());
            followingList.add(userMap);
        }

        return followingList;
    }

    /**
     * Get list of followers of a user
     */
    public List<Map<String, Object>> getFollowersList(@NonNull Long userId) {
        List<Followers> followers = followRepository.findByFollowedId(userId);
        List<Map<String, Object>> followersList = new ArrayList<>();

        for (Followers follow : followers) {
            User followerUser = follow.getFollower();
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", followerUser.getId());
            userMap.put("name", followerUser.getName());
            userMap.put("email", followerUser.getEmailId());
            followersList.add(userMap);
        }

        return followersList;
    }

    /**
     * Get count of users that a user is following
     */
    public long getFollowingCount(@NonNull Long userId) {
        return followRepository.countByFollowerId(userId);
    }

    /**
     * Get count of followers of a user
     */
    public long getFollowersCount(@NonNull Long userId) {
        return followRepository.countByFollowedId(userId);
    }
}
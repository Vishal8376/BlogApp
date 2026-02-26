package com.example.blog.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.Service.FollowService;

@RestController
@RequestMapping("/api/follow")
public class FollowController {

    @Autowired
    private FollowService service;

    /**
     * Follow a user
     * POST /api/follow?followerId=1&followedUserId=5
     */
    @PostMapping
    public Map<String, Object> follow(@RequestParam long followerId,
                                      @RequestParam long followedUserId) {
        return service.followUser(followerId, followedUserId);
    }
            
    /**
     * Unfollow a user
     * DELETE /api/follow?followerId=1&followedUserId=5
     */
    @DeleteMapping
    public Map<String, String> unfollow(@RequestParam long followerId,
                                        @RequestParam long followedUserId) {
        return service.unfollowUser(followerId, followedUserId);
    }

    /**
     * Check if following a user
     * GET /api/follow/check?followerId=1&followedId=5
     */
    @GetMapping("/check")
    public boolean checkFollowing(@RequestParam long followerId,
                                  @RequestParam long followedId) {
        return service.isFollowing(followerId, followedId);
    }

    /**
     * Get list of users I'm following
     * GET /api/follow/following?userId=1
     */
    @GetMapping("/following")
    public Object getFollowingList(@RequestParam long userId) {
        return service.getFollowingList(userId);
    }

    /**
     * Get list of my followers
     * GET /api/follow/followers?userId=1
     */
    @GetMapping("/followers")
    public Object getFollowersList(@RequestParam long userId) {
        return service.getFollowersList(userId);
    }

    /**
     * Get following count
     * GET /api/follow/following/count?userId=1
     */
    @GetMapping("/following/count")
    public long getFollowingCount(@RequestParam long userId) {
        return service.getFollowingCount(userId);
    }

    /**
     * Get followers count
     * GET /api/follow/followers/count?userId=1
     */
    @GetMapping("/followers/count")
    public long getFollowersCount(@RequestParam long userId) {
        return service.getFollowersCount(userId);
    }
}
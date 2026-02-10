# 📚 BlogApp - COMPLETE DOCUMENTATION FROM SCRATCH TO END

---

## TABLE OF CONTENTS
1. [PROJECT OVERVIEW](#project-overview)
2. [TECHNOLOGY STACK](#technology-stack)
3. [PROJECT STRUCTURE](#project-structure)
4. [DATABASE ENTITIES & RELATIONSHIPS](#database-entities--relationships)
5. [COMPLETE API DOCUMENTATION](#complete-api-documentation)
6. [SECURITY & AUTHENTICATION](#security--authentication)
7. [SERVICE LAYER - COMPLETE IMPLEMENTATION](#service-layer---complete-implementation)
8. [REPOSITORY LAYER - DATABASE QUERIES](#repository-layer---database-queries)
9. [CONTROLLER LAYER - ENDPOINT HANDLERS](#controller-layer---endpoint-handlers)
10. [REQUEST/RESPONSE MODELS](#requestresponse-models)
11. [DATABASE CONFIGURATION](#database-configuration)
12. [STEP-BY-STEP EXECUTION FLOW](#step-by-step-execution-flow)
13. [FEATURE EXPLANATIONS](#feature-explanations)
14. [SETUP & DEPLOYMENT](#setup--deployment)
15. [TESTING GUIDE](#testing-guide)
16. [ERROR HANDLING](#error-handling)
17. [PERFORMANCE OPTIMIZATION](#performance-optimization)
18. [BEST PRACTICES IMPLEMENTED](#best-practices-implemented)

---

## PROJECT OVERVIEW

### What is BlogApp?
**BlogApp** is a comprehensive **social blogging REST API** built with Spring Boot 3.5.10 and Java 17. It resembles a Twitter/Medium-like platform where users can:
- Create and publish blog posts
- Discover posts through advanced search with hashtags
- Build social networks via follow/unfollow relationships
- Interact with posts (like/comment)
- Bookmark/save posts for personal collections
- View user profiles and follow lists

### Purpose
BlogApp demonstrates:
- Spring Boot REST API development
- Spring Security integration
- JPA/Hibernate ORM mapping
- Layered architecture (Controller → Service → Repository)
- Database design with complex relationships
- Authentication & Authorization
- Best practices in Java web application development

### Application Type
- **Type**: REST API (Backend only - no Frontend)
- **Protocol**: HTTP/HTTPS
- **Default Port**: 8090
- **Database**: MySQL
- **Authentication**: Session-based with Spring Security

---

## TECHNOLOGY STACK

### Core Framework & Language
```
┌─────────────────────────────────┐
│ Java 17 (LTS)                   │ Programming Language
│ Spring Boot 3.5.10              │ Application Framework
│ Spring Security 6               │ Authentication/Authorization
│ Spring Data JPA                 │ ORM Framework
│ Hibernate                       │ JPA Implementation
└─────────────────────────────────┘
```

### Database & Drivers
```
MySQL 5.7+ / 8.0
├── Connector: mysql-connector-j (Latest)
├── JDBC Protocol: jdbc:mysql
├── Database: blog_app
├── User: Venkat
└── Password: vcc.20071
```

### Build & Dependency Management
```
Maven 3.6+
├── Build Tool: Maven (mvnw/mvnw.cmd for wrapper)
├── Java Version: 17
├── Packaging: JAR
└── Spring Boot Parent: spring-boot-starter-parent:3.5.10
```

### Key Dependencies
```xml
1. Spring Boot Starter Web           - REST API support
2. Spring Boot Starter Data JPA      - Database access layer
3. Spring Boot Starter Security      - Authentication/Authorization
4. MySQL Connector J                 - Database driver
5. Lombok                            - Boilerplate reduction
6. Spring Boot DevTools              - Hot reload & development
7. Jackson                           - JSON serialization/deserialization
```

### Development Tools
```
IDE: VS Code / IntelliJ IDEA
Postman/REST Client: For API testing
MySQL Workbench: Database management
```

---

## PROJECT STRUCTURE

```
BlogApp/
│
├── pom.xml                          ← Maven Configuration
├── mvnw & mvnw.cmd                 ← Maven Wrapper (Run without Maven installed)
├── README.md                        ← Project Documentation
│
└── src/
    ├── main/
    │   ├── java/com/example/blog/
    │   │   ├── BlogApplication.java               ← Spring Boot Entry Point
    │   │   │
    │   │   ├── config/
    │   │   │   └── SecurityConfig.java           ← Spring Security Configuration
    │   │   │
    │   │   ├── Controller/                        ← REST Endpoint Handlers
    │   │   │   ├── LoginController.java
    │   │   │   ├── SignUpController.java
    │   │   │   ├── PostController.java
    │   │   │   ├── SearchController.java
    │   │   │   ├── FollowController.java
    │   │   │   ├── InteractionController.java
    │   │   │   ├── SavedPostController.java
    │   │   │   ├── UserController.java
    │   │   │   └── AutoCompleteController.java
    │   │   │
    │   │   ├── Service/                           ← Business Logic Layer
    │   │   │   ├── LoginService.java
    │   │   │   ├── SignUpService.java
    │   │   │   ├── PostService.java
    │   │   │   ├── SearchService.java
    │   │   │   ├── FollowService.java
    │   │   │   ├── InteractionService.java
    │   │   │   ├── SavedPostService.java
    │   │   │   ├── UserService.java
    │   │   │   ├── AutoCompleteService.java
    │   │   │   ├── CustomUserDetailsService.java  ← Spring Security Integration
    │   │   │   └── CustomUserDetails.java         ← Custom UserDetails Implementation
    │   │   │
    │   │   ├── Repository/                        ← Database Access Layer
    │   │   │   ├── UserRepository.java
    │   │   │   ├── PostRepository.java
    │   │   │   ├── FollowRepository.java
    │   │   │   ├── InteractionRepository.java
    │   │   │   ├── SavedPostRepository.java
    │   │   │   └── LoginRepository.java
    │   │   │
    │   │   └── Entity/                            ← Data Models/ORM Entities
    │   │       ├── User.java
    │   │       ├── Post.java
    │   │       ├── Followers.java
    │   │       ├── InteractionEntity.java
    │   │       ├── SavedPost.java
    │   │       └── SignUp.java
    │   │
    │   └── resources/
    │       └── application.properties             ← Spring Boot Configuration
    │
    └── test/
        └── java/com/example/blog/
            └── BlogApplicationTests.java          ← Unit Tests
```

---

## DATABASE ENTITIES & RELATIONSHIPS

### Entity Relationship Diagram (ERD)

```
                          ┌─────────────────┐
                          │      User       │
                          │─────────────────│
                          │ id (PK)         │
                          │ name            │
                          │ password        │
                          │ emailId (UNIQUE)│
                          │ bio             │
                          │ profilePicUrl   │
                          └────────┬────────┘
                    ┌──────────────┼──────────────┐
                    │              │              │
                    │ 1:Many       │ 1:Many       │ 1:Many
                    │              │              │
        ┌───────────┴──────┐  ┌────┴──────┐  ┌──┴──────────────┐
        │                  │  │            │  │                 │
    ┌───────────┐  ┌──────────────┐  ┌─────────────────┐  ┌─────────────┐
    │   Post    │  │ Interaction  │  │   SavedPost     │  │ Followers   │
    │───────────│  │──────────────│  │─────────────────│  │─────────────│
    │ id (PK)   │  │ id (PK)      │  │ id (PK)         │  │ id (PK)     │
    │ category  │  │ comment      │  │ user_id (FK)    │  │ follower_id │
    │ description│ │ isLike       │  │ post_id (FK)    │  │ followed_id │
    │ image     │  │ time         │  │                 │  │             │
    │ author    │  │ post_id (FK) │  └─────────────────┘  └─────────────┘
    │ time      │  │ user_id (FK) │         ↑                    ↑
    │ hashtags  │  └──────────────┘         │                    │
    │ user_id   │         ↑                 │ References    References
    │ (FK)      │         │ References      │ User.id       User.id
    └───────────┘         │ User & Post     │
         ↑               │               
         │ References    │
         │ User.id       │
         └───────────────┴────────────────┘
```

### 1. USER ENTITY (Primary User Management)

**Table Name**: `users`

**Fields**:
```java
@Id
private long id;                          // Auto-increment primary key

@Column(nullable=false, length=100)
private String name;                      // User's full name (required)

@Column(nullable=false, length=255)
@JsonProperty(access = WRITE_ONLY)
private String password;                  // BCrypt encrypted password (not returned in API)

@Column(nullable=false, length=100, unique=true)
private String emailId;                   // Unique email identifier (required, unique)

@Column(length=500)
private String bio;                       // User biography (optional)

@Column(length=255)
private String profilePicUrl;             // URL to profile picture (optional)

@OneToMany(mappedBy="user", cascade=CascadeType.ALL, orphanRemoval=true)
private List<Post> posts;                 // Posts created by this user

@OneToMany(mappedBy="user", cascade=CascadeType.ALL, orphanRemoval=true)
private List<InteractionEntity> interactions;  // Likes/comments made by this user

@OneToMany(mappedBy="user", cascade=CascadeType.ALL, orphanRemoval=true)
private List<SavedPost> savedPosts;       // Bookmarked posts by this user
```

**Relationships**:
- 1 User → Many Posts (One user creates many posts)
- 1 User → Many InteractionEntity (One user makes many interactions)
- 1 User → Many SavedPost (One user bookmarks many posts)
- 1 User → Many Followers (As follower or followed)

**Cascade Behavior**:
- When User is deleted: All related Posts, Interactions, SavedPosts are deleted
- orphanRemoval=true: Removes relationships when removed from collection

---

### 2. POST ENTITY (Blog Post Management)

**Table Name**: `posts`

**Fields**:
```java
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;                          // Auto-increment primary key

@Column(nullable=false, length=100)
private String category;                  // Post category (required) - e.g., "Technology", "Lifestyle"

@Column(columnDefinition="LONGTEXT", nullable=false)
private String description;               // Post content (required, large text)

private String image;                     // Image URL associated with post

@Column(nullable=false)
private String author;                    // Author's name (required)

@CreationTimestamp
private LocalDateTime time;               // Auto-generated creation timestamp

private String hashtags;                  // Hashtags for post - e.g., "#java #spring"

@ManyToOne(fetch=FetchType.LAZY)
@JoinColumn(name="user_id", nullable=true)
@JsonIgnore
private User user;                        // User who created this post (lazy loaded)

@OneToMany(mappedBy="post", cascade=CascadeType.ALL, orphanRemoval=true)
private List<InteractionEntity> interactions;  // Likes and comments on this post

@OneToMany(mappedBy="post", cascade=CascadeType.ALL, orphanRemoval=true)
@JsonIgnore
private List<SavedPost> savedPosts;      // Users who bookmarked this post
```

**Relationships**:
- Many Posts → 1 User (Multiple posts by one user)
- 1 Post → Many InteractionEntity (Post receives many likes/comments)
- 1 Post → Many SavedPost (Post can be saved by many users)

**Key Characteristics**:
- Lazy loading on User: User is fetched only when accessed
- Cascade delete: Deleting post deletes all interactions and saved references
- @JsonIgnore on relationships: Prevents infinite JSON recursion

---

### 3. FOLLOWERS ENTITY (Social Graph)

**Table Name**: `follows`

**Fields**:
```java
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;                          // Auto-increment primary key

@ManyToOne(fetch=FetchType.LAZY)
@JoinColumn(name="follower_id", nullable=false)
private User follower;                    // User who is following

@ManyToOne(fetch=FetchType.LAZY)
@JoinColumn(name="followed_id", nullable=false)
private User followed;                    // User being followed
```

**Structure**:
- Direct mapping between two User entities
- Two foreign keys: follower_id and followed_id
- Represents directed relationship: follower → followed

**Example**:
```
Follower_ID = 1 (John)
Followed_ID = 5 (Jane)
Interpretation: John follows Jane
```

**Usage**: Build following/follower lists, check if user follows another

---

### 4. INTERACTIONENTITY (Likes & Comments)

**Table Name**: `interactions`

**Fields**:
```java
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;                          // Auto-increment primary key

private String comment;                   // Comment text (null if this is a like)

@Column(name="is_like")
private boolean isLike;                   // true = like, false = comment

private LocalDateTime time;               // When interaction was created

@ManyToOne(fetch=FetchType.LAZY)
@JoinColumn(name="post_id", nullable=false)
private Post post;                        // Post being interacted with

@ManyToOne(fetch=FetchType.LAZY)
@JoinColumn(name="user_id", nullable=false)
private User user;                        // User making the interaction
```

**Dual Purpose**:
- **Like**: isLike=true, comment=null
- **Comment**: isLike=false, comment={text}

**Composite Key Concept**:
- (post_id, user_id) should ideally be unique to prevent duplicate likes
- Current implementation allows re-toggling likes on same post by same user

---

### 5. SAVEDPOST ENTITY (Bookmarking System)

**Table Name**: `saved_posts`

**Fields**:
```java
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;                          // Auto-increment primary key

@ManyToOne(fetch=FetchType.LAZY)
@JoinColumn(name="user_id", nullable=false)
@JsonIgnore
private User user;                        // User who saved the post

@ManyToOne(fetch=FetchType.LAZY)
@JoinColumn(name="post_id", nullable=false)
private Post post;                        // Post being saved
```

**Purpose**: Personal curation - users can bookmark posts for later reading

**Join Table Pattern**: A simple join table connecting User ↔ Post for many-to-many relationship

---

### 6. SIGNUP ENTITY (Registration Model)

**Note**: SignUp entity mirrors User entity structure. Used for registration flow.

```java
// Identical structure to User entity
@Entity
@Table(name="users")  // Same table as User
public class SignUp {
    private long id;
    private String name;
    private String password;
    private String emailId;
    private String bio;
    private String profilePicUrl;
    private List<Post> posts;
    private List<InteractionEntity> interactions;
    private List<SavedPost> savedPosts;
}
```

**Purpose**: Alternative naming for user registration endpoint

---

## COMPLETE API DOCUMENTATION

### BASE URL
```
http://localhost:8090/api
```

### COMMON HTTP HEADERS
```
Content-Type: application/json
Accept: application/json
```

### COMMON RESPONSE CODES
```
200 OK              - Request successful
201 CREATED         - Resource created successfully
400 BAD REQUEST     - Invalid request parameters
401 UNAUTHORIZED    - Authentication required or failed
404 NOT FOUND       - Resource not found
500 INTERNAL SERVER ERROR - Server error
```

---

## AUTHENTICATION ENDPOINTS

### 1. SIGNUP - User Registration

**Endpoint**: `POST /api/signup`

**Request Body**:
```json
{
  "name": "John Doe",
  "emailId": "john@example.com",
  "password": "SecurePassword123",
  "bio": "Software developer",
  "profilePicUrl": "https://example.com/pic.jpg"
}
```

**Validation**:
- Email must be unique
- Email, password, name are required (validated in controller)
- Password will be BCrypt encrypted

**Response** (201 CREATED):
```json
{
  "message": "User registered successfully"
}
```

**Error Responses**:
```json
{
  "error": "Email, password and name are required"
}
```

**Backend Flow**:
1. SignUpController receives request
2. Validates required fields (email, password, name)
3. Calls SignUpService.registerUser()
4. SignUpService BCrypt-encodes password
5. UserRepository saves user to database
6. Returns success message

**Code Implementation**:
```java
// SignUpService
public User registerUser(User user) {
    if (user.getPassword() != null && !user.getPassword().isEmpty()) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
    }
    return repo.save(user);
}
```

---

### 2. LOGIN - User Authentication

**Endpoint**: `POST /api/login`

**Parameters**:
```
emailId  (query param) - User's email
password (query param) - User's password
```

**Example URL**:
```
POST http://localhost:8090/api/login?emailId=john@example.com&password=password123
```

**Validation**:
- Email and password must not be empty
- Will be authenticated against BCrypt encrypted password in database

**Response** (200 OK):
```json
{
  "message": "Login successful"
}
```

**Error Responses**:
```json
{
  "error": "Invalid email or password"
}

{
  "error": "Email and password are required"
}
```

**Backend Flow**:
1. LoginController receives emailId and password
2. Validates both parameters are provided
3. Uses AuthenticationManager to authenticate
4. Creates UsernamePasswordAuthenticationToken
5. AuthenticationManager delegates to DaoAuthenticationProvider
6. CustomUserDetailsService loads user from database
7. BCryptPasswordEncoder verifies password
8. If successful, SecurityContext is created and stored in session
9. Session stored in HttpSession with SPRING_SECURITY_CONTEXT_KEY
10. Returns success message

**Code Implementation**:
```java
// LoginController
@PostMapping("/login")
public ResponseEntity<?> login(@RequestParam String emailId, 
                               @RequestParam String password,
                               HttpServletRequest request) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(emailId, password)
    );
    
    if (authentication.isAuthenticated()) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        request.getSession(true).setAttribute(
            HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
            context
        );
        return ResponseEntity.ok("Login successful");
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                       .body("Invalid email or password");
}
```

---

## POST MANAGEMENT ENDPOINTS

### 3. CREATE POST - Publish New Post ⚠️ REQUIRES AUTHENTICATION

**Endpoint**: `POST /api/posts/create`

**Security**: Requires authenticated user (Spring Security @Secured annotation)

**Request Body**:
```json
{
  "category": "Technology",
  "description": "This is a comprehensive guide to Spring Boot security...",
  "image": "https://example.com/image.jpg",
  "author": "John Doe",
  "hashtags": "#spring #security #java"
}
```

**Field Requirements**:
- category: Max 100 characters
- description: Can be very long (LONGTEXT)
- image: Optional
- author: Required
- hashtags: Optional, typically formatted as #tag1 #tag2

**Response** (200 OK):
```json
{
  "id": 1,
  "category": "Technology",
  "description": "This is a comprehensive guide to Spring Boot security...",
  "image": "https://example.com/image.jpg",
  "author": "John Doe",
  "time": "2026-02-10T15:30:45",
  "hashtags": "#spring #security #java",
  "user": {
    "id": 5,
    "name": "John Doe",
    "emailId": "john@example.com"
  }
}
```

**Error Responses**:
```json
{
  "error": "Login required"
}  // 401 UNAUTHORIZED - Not authenticated

{
  "error": "Authenticated user not found"
}  // 500 - User in session not found in database
```

**Backend Flow**:
1. PostController.createPost() checked if user is authenticated
2. If not authenticated (AnonymousAuthenticationToken) or null, return 401
3. Gets authenticated user's email from Authentication.getName()
4. Calls PostService.createPost(post, emailId)
5. PostService finds User by emailId from database
6. Sets the user on the post entity
7. PostRepository saves post
8. Returns saved post with all details

**Code Implementation**:
```java
// PostService
public Post createPost(Post post, String emailId) {
    User user = userRepository.findByEmailId(emailId).orElse(null);
    if (user == null) {
        throw new IllegalStateException("Authenticated user not found");
    }
    post.setUser(user);
    return postRepository.save(post);
}
```

---

### 4. GET ALL POSTS

**Endpoint**: `GET /api/posts/all`

**Security**: Public (no authentication required)

**Parameters**: None

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "category": "Technology",
    "description": "Spring Boot guide...",
    "image": "https://...",
    "author": "John",
    "time": "2026-02-10T15:30:45",
    "hashtags": "#spring #java"
  },
  {
    "id": 2,
    "category": "Lifestyle",
    "description": "Morning routine tips...",
    "author": "Jane",
    "time": "2026-02-10T14:20:30",
    "hashtags": "#wellness #morning"
  }
]
```

**Backend Flow**:
1. PostController calls PostService.getAllPosts()
2. PostService calls PostRepository.findAll()
3. Returns all posts from database
4. User relationships excluded from JSON output

---

### 5. GET POSTS BY CATEGORY

**Endpoint**: `GET /api/posts/category/{category}`

**Parameters**:
- category (path param): Category name to filter by

**Example**:
```
GET http://localhost:8090/api/posts/category/Technology
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "category": "Technology",
    "description": "Spring Boot guide...",
    "author": "John",
    "hashtags": "#spring"
  }
]
```

**Backend Implementation**:
```java
// PostService
public List<Post> getPostsByCategory(String category) {
    return postRepository.findByCategory(category);
}

// PostRepository
List<Post> findByCategory(String category);  // JPA auto-implements this
```

---

### 6. DELETE POST

**Endpoint**: `DELETE /api/posts/delete/{id}`

**Parameters**:
- id (path param): Post ID to delete

**Example**:
```
DELETE http://localhost:8090/api/posts/delete/1
```

**Response** (200 OK):
```
(Empty response or success message)
```

**Backend Flow**:
1. PostController.deletePost(id) called
2. Calls PostService.deletePost(id)
3. PostService validates id is not null
4. PostRepository.deleteById(id) executes
5. Post and all related Interactions and SavedPosts deleted (cascade)

---

## SEARCH & DISCOVERY ENDPOINTS

### 7. SEARCH POSTS (Global Search)

**Endpoint**: `GET /api/search?q={query}`

**Parameters**:
- q (query param): Search keyword

**Example**:
```
GET http://localhost:8090/api/search?q=spring+boot
```

**Validation**:
- Query cannot be empty
- Returns error if query is null or whitespace

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "category": "Technology",
    "description": "Spring Boot comprehensive guide that includes...",
    "author": "John Doe",
    "hashtags": "#spring #boot"
  },
  {
    "id": 5,
    "category": "Backend",
    "description": "Spring Backend development tutorial...",
    "author": "Jane Smith",
    "hashtags": "#spring #backend"
  }
]
```

**Search Algorithm**:
Searches across:
1. Post description (full-text match)
2. Hashtags (tag matching)
3. Author name (author search)
4. Category (category matching)

All searches are case-insensitive using LOWER() in SQL

**Query Implementation**:
```java
// PostRepository
@Query("""
  SELECT p FROM Post p
  WHERE LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
  OR (p.hashtags IS NOT NULL AND LOWER(p.hashtags) LIKE LOWER(CONCAT('%', :keyword,'%')))
  OR LOWER(p.author) LIKE LOWER(CONCAT('%', :keyword, '%'))
  OR LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
List<Post> globalSearch(@Param("keyword")String keyword);
```

**Error Response** (400 BAD REQUEST):
```json
{
  "error": "Search query cannot be empty"
}
```

---

### 8. AUTOCOMPLETE SUGGESTIONS

**Endpoint**: `GET /api/search/suggest?prefix={prefix}`

**Parameters**:
- prefix (query param): Prefix to match

**Example**:
```
GET http://localhost:8090/api/search/suggest?prefix=spr
```

**Response** (200 OK):
```json
[
  "Spring Boot",
  "Spring Security",
  "Sprint Planning",
  "#spring",
  "Technology"
]
```

**Backend Flow**:
1. AutoCompleteController receives prefix
2. Calls AutoCompleteService.suggest(prefix)
3. Service queries 3 different suggestion types:
   - Authors matching prefix
   - Hashtags matching prefix
   - Categories matching prefix
4. Combines results into LinkedHashSet (removes duplicates, maintains order)
5. Returns top 5 suggestions

**Implementation**:
```java
// AutoCompleteService
public List<String> suggest(String prefix) {
    Set<String> suggestions = new LinkedHashSet<>();
    suggestions.addAll(postRepository.suggestAuthors(prefix));
    suggestions.addAll(postRepository.suggestHashtags(prefix));
    suggestions.addAll(postRepository.suggestCategories(prefix));
    return suggestions.stream().limit(5).toList();
}

// PostRepository Queries
@Query("SELECT DISTINCT p.author FROM Post p 
        WHERE LOWER(p.author) LIKE LOWER(CONCAT('%',:prefix, '%'))")
List<String> suggestAuthors(@Param("prefix") String prefix);

@Query("SELECT DISTINCT p.hashtags FROM Post p 
        WHERE p.hashtags IS NOT NULL AND LOWER(p.hashtags) LIKE LOWER(CONCAT('%',:prefix, '%'))")
List<String> suggestHashtags(@Param("prefix") String prefix);

@Query("SELECT DISTINCT p.category FROM Post p 
        WHERE p.category IS NOT NULL AND LOWER(p.category) LIKE LOWER(CONCAT('%',:prefix, '%'))")
List<String> suggestCategories(@Param("prefix") String prefix);
```

---

## SOCIAL FEATURES ENDPOINTS

### 9. FOLLOW USER

**Endpoint**: `POST /api/follow?followerId={id}&followedUserId={id}`

**Parameters**:
- followerId (query param): ID of user doing the following
- followedUserId (query param): ID of user to follow

**Example**:
```
POST http://localhost:8090/api/follow?followerId=1&followedUserId=5
```

**Validation**:
- Both users must exist
- Cannot follow yourself
- Cannot follow someone you're already following

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Successfully followed user",
  "followId": 10,
  "followerId": 1,
  "followerName": "John Doe",
  "followedId": 5,
  "followedName": "Jane Smith",
  "isFollowing": true
}
```

**Error Responses**:
```json
{
  "error": "User not found"
}

{
  "error": "Cannot follow yourself"
}

{
  "error": "Already following this user"
}
```

**Database Changes**:
- New record created in `follows` table
- follower_id = 1, followed_id = 5

---

### 10. UNFOLLOW USER

**Endpoint**: `DELETE /api/follow?followerId={id}&followedUserId={id}`

**Parameters**:
- followerId (query param): ID of user doing the unfollowing
- followedUserId (query param): ID of user to unfollow

**Example**:
```
DELETE http://localhost:8090/api/follow?followerId=1&followedUserId=5
```

**Response** (200 OK):
```json
{
  "success": "true",
  "message": "Successfully unfollowed user"
}
```

**Error Response**:
```json
{
  "error": "Not following this user"
}
```

**Database Changes**:
- Record deleted from `follows` table matching follower_id and followed_id

---

### 11. CHECK IF FOLLOWING

**Endpoint**: `GET /api/follow/check?followerId={id}&followedId={id}`

**Parameters**:
- followerId (query param): User checking
- followedId (query param): User to check against

**Example**:
```
GET http://localhost:8090/api/follow/check?followerId=1&followedId=5
```

**Response**:
```
true   (if following)
false  (if not following)
```

**Implementation**:
```java
// FollowService
public boolean isFollowing(Long followerId, Long followedId) {
    return followRepository.existsByFollowerIdAndFollowedId(followerId, followedId);
}
```

---

### 12. GET FOLLOWING LIST

**Endpoint**: `GET /api/follow/following?userId={id}`

**Parameters**:
- userId (query param): User to get following list for

**Example**:
```
GET http://localhost:8090/api/follow/following?userId=1
```

**Response** (200 OK):
```json
[
  {
    "id": 5,
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  {
    "id": 8,
    "name": "Bob Johnson",
    "email": "bob@example.com"
  }
]
```

**Explanation**: Lists all users that userId #1 is following

---

### 13. GET FOLLOWERS LIST

**Endpoint**: `GET /api/follow/followers?userId={id}`

**Parameters**:
- userId (query param): User to get followers for

**Example**:
```
GET http://localhost:8090/api/follow/followers?userId=5
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": 3,
    "name": "Alice Brown",
    "email": "alice@example.com"
  }
]
```

**Explanation**: Lists all users who are following userId #5

---

### 14. GET FOLLOWING COUNT

**Endpoint**: `GET /api/follow/following/count?userId={id}`

**Parameters**:
- userId (query param): User to count following for

**Example**:
```
GET http://localhost:8090/api/follow/following/count?userId=1
```

**Response** (200 OK):
```
15
```

**Explanation**: User #1 is following 15 people

---

### 15. GET FOLLOWERS COUNT

**Endpoint**: `GET /api/follow/followers/count?userId={id}`

**Parameters**:
- userId (query param): User to count followers for

**Example**:
```
GET http://localhost:8090/api/follow/followers/count?userId=5
```

**Response** (200 OK):
```
42
```

**Explanation**: User #5 has 42 followers

---

## INTERACTION ENDPOINTS

### 16. TOGGLE LIKE

**Endpoint**: `POST /api/interactions/like?postId={id}&userId={id}`

**Parameters**:
- postId (query param): Post to like
- userId (query param): User liking the post

**Example**:
```
POST http://localhost:8090/api/interactions/like?postId=1&userId=5
```

**Response**:
```
"Like updated"
```

**Backend Behavior**:
- First like: Creates interaction with isLike=true
- Second like (same user, same post): Toggles isLike to false (unlike)
- Third like: Toggles back to true (re-like)

**Implementation**:
```java
public void toggleLike(Long postId, Long userId) {
    Optional<InteractionEntity> existing = repo.findByPostIdAndUserId(postId, userId);
    
    if(existing.isPresent()) {
        InteractionEntity i = existing.get();
        i.setLike(!i.isLike());  // Toggle like status
        repo.save(i);
        return;
    }
    
    // Create new like interaction
    InteractionEntity i = new InteractionEntity();
    Post post = postRepository.findById(postId).orElse(null);
    User user = userRepository.findById(userId).orElse(null);
    
    if (post != null && user != null) {
        i.setPost(post);
        i.setUser(user);
        i.setLike(true);
        i.setTime(LocalDateTime.now());
        repo.save(i);
    }
}
```

---

### 17. ADD COMMENT

**Endpoint**: `POST /api/interactions/comment?postId={id}&userId={id}&comment={text}`

**Parameters**:
- postId (query param): Post to comment on
- userId (query param): User making comment
- comment (query param): Comment text

**Example**:
```
POST http://localhost:8090/api/interactions/comment?postId=1&userId=5&comment=Great+post!
```

**Response**:
```
"Comment added"
```

**Backend Behavior**:
- Creates new InteractionEntity record
- isLike = false
- comment = provided text
- time = current timestamp

**Database Record**:
```sql
INSERT INTO interactions (post_id, user_id, comment, is_like, time)
VALUES (1, 5, 'Great post!', false, NOW());
```

---

## USER PROFILE ENDPOINTS

### 18. GET USER PROFILE

**Endpoint**: `GET /api/user/{id}`

**Parameters**:
- id (path param): User ID to retrieve

**Example**:
```
GET http://localhost:8090/api/user/5
```

**Response** (200 OK):
```json
{
  "id": 5,
  "name": "Jane Smith",
  "emailId": "jane@example.com",
  "bio": "Software developer and tech enthusiast",
  "profilePicUrl": "https://example.com/jane.jpg"
}
```

**Error Response** (404 NOT FOUND):
```json
{
  "error": "User not found"
}
```

**Note**: Password is never returned due to @JsonProperty(access = WRITE_ONLY)

---

### 19. UPDATE USER PROFILE

**Endpoint**: `PUT /api/user/{id}`

**Parameters**:
- id (path param): User ID to update

**Request Body**:
```json
{
  "name": "Jane Doe Smith",
  "bio": "Software engineer and open source contributor",
  "profilePicUrl": "https://example.com/jane-new.jpg"
}
```

**Response** (200 OK):
```json
{
  "id": 5,
  "name": "Jane Doe Smith",
  "emailId": "jane@example.com",
  "bio": "Software engineer and open source contributor",
  "profilePicUrl": "https://example.com/jane-new.jpg"
}
```

**Update Logic**:
- Only provided fields are updated
- If field is null/empty, existing value is kept
- Email cannot be changed via this endpoint

---

### 20. UPDATE PASSWORD

**Endpoint**: `PUT /api/user/{id}/password`

**Parameters**:
- id (path param): User ID

**Request Body**:
```json
{
  "oldPassword": "CurrentPassword123",
  "newPassword": "NewPassword456"
}
```

**Response** (200 OK):
```json
{
  "message": "Password updated successfully"
}
```

**Validation**:
- Old password must match current encrypted password
- Both old and new passwords required
- New password is BCrypt encrypted before storage

**Error Responses**:
```json
{
  "error": "Old password is incorrect"
}

{
  "error": "Old and new password are required"
}

{
  "error": "User not found"
}
```

---

### 21. UPDATE EMAIL

**Endpoint**: `PUT /api/user/{id}/email`

**Parameters**:
- id (path param): User ID

**Request Body**:
```json
{
  "newEmail": "newemail@example.com"
}
```

**Response** (200 OK):
```json
{
  "id": 5,
  "name": "Jane Smith",
  "emailId": "newemail@example.com",
  "emailId": "newemail@example.com"
}
```

**Validation**:
- New email must be unique in system
- Cannot change to another user's email
- New email is required

**Error Responses**:
```json
{
  "error": "Email already in use"
}

{
  "error": "New email is required"
}
```

---

## SAVED POSTS (BOOKMARKING) ENDPOINTS

### 22. SAVE POST

**Endpoint**: `POST /api/saved-posts/user/{userId}/post/{postId}`

**Parameters**:
- userId (path param): User saving the post
- postId (path param): Post to save

**Example**:
```
POST http://localhost:8090/api/saved-posts/user/5/post/10
```

**Response** (200 OK):
```json
{
  "id": 15,
  "user": {
    "id": 5,
    "name": "Jane Smith"
  },
  "post": {
    "id": 10,
    "title": "Spring Boot Guide",
    "category": "Technology"
  }
}
```

**Error Responses** (404 NOT FOUND):
```json
{
  "error": "User or Post not found"
}
```

---

### 23. GET SAVED POSTS BY USER

**Endpoint**: `GET /api/saved-posts/user/{userId}`

**Parameters**:
- userId (path param): User to get saved posts for

**Example**:
```
GET http://localhost:8090/api/saved-posts/user/5
```

**Response** (200 OK):
```json
[
  {
    "id": 15,
    "post": {
      "id": 10,
      "category": "Technology",
      "description": "Spring Boot comprehensive guide...",
      "author": "John Doe",
      "hashtags": "#spring #boot"
    }
  },
  {
    "id": 16,
    "post": {
      "id": 12,
      "category": "Lifestyle",
      "description": "Morning routine tips for developers...",
      "author": "Alice Brown",
      "hashtags": "#wellness #productivity"
    }
  }
]
```

---

## SECURITY & AUTHENTICATION

### Security Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    HTTP Request                          │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │   Spring Security Filter Chain      │
         └──────────────┬──────────────────────┘
                        │
                   Does request
                   need auth?
                   /
                  /  \
                YES   NO
                /      \
               ▼        ▼
        Check Session  Allow
        in HttpSession  Request
            │           │
            ▼           ▼
        Get Security    Request
        Context from    Processed
        Session        
            │
            ▼
        Validate
        Authenticated
            │
        ┌───┴────┐
        ▼        ▼
       Yes      No (401 Unauthorized)
        │
        ▼
    Allow Request
    (User in Principal)
```

### SecurityConfig.java Flow

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 1. PASSWORD ENCODING
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Industry standard encryption
    }

    // 2. AUTHENTICATION PROVIDER
    @Bean
    public DaoAuthenticationProvider authenticationProvider(
            CustomUserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }
    // Provides DAO-based authentication using:
    // - CustomUserDetailsService: loads user from DB
    // - PasswordEncoder: validates password with BCrypt

    // 3. AUTHENTICATION MANAGER
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
    // Entry point for authenticating users

    // 4. SECURITY FILTER CHAIN
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            DaoAuthenticationProvider authenticationProvider)
            throws Exception {
        http
            // Disable CSRF (not needed for stateless REST APIs)
            .csrf(csrf -> csrf.disable())
            
            // Authorization rules (who can access what)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/login", "/api/signup").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/posts/create").authenticated()
                .anyRequest().permitAll()
            )
            
            // Session management
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            
            // Set authentication provider
            .authenticationProvider(authenticationProvider);

        return http.build();
    }
}
```

### Authentication Flow - Step by Step

#### SIGNUP FLOW
```
1. User submits signup form
   {emailId, password, name}
   ↓
2. SignUpController receives request
   ↓
3. Validation checks (email/password/name not empty)
   ↓
4. SignUpService.registerUser(user) called
   ↓
5. PasswordEncoder.encode(password) → BCrypt hash
   └─ Original password: "MyPassword123"
   └─ Stored hash: "$2a$10$M9.cG..."
   ↓
6. UserRepository.save(user) → saved to database
   ↓
7. Response sent: "User registered successfully"
   ↓
8. User created but NOT authenticated yet
```

#### LOGIN FLOW
```
1. User submits login form
   {emailId, password}
   ↓
2. LoginController receives request
   ↓
3. Validation checks (both not empty)
   ↓
4. AuthenticationManager receives request
   ↓
5. Create UsernamePasswordAuthenticationToken(emailId, password)
   ↓
6. DaoAuthenticationProvider processes authentication:
   a) CustomUserDetailsService.loadUserByUsername(emailId)
      └─ Queries UserRepository by email
      └─ If found: returns CustomUserDetails(user)
      └─ If not found: throws UsernameNotFoundException
   ↓
   b) PasswordEncoder.matches(submittedPassword, storedHash)
      └─ Submitted: "MyPassword123"
      └─ Stored: "$2a$10$M9.cG..."
      └─ BCrypt verifies if match → true/false
   ↓
7. Authentication success check
   └─ If password matches: authentication.isAuthenticated() = true
   └─ If password doesn't match: AuthenticationException thrown
   ↓
8. If successful:
   a) Create empty SecurityContext
      SecurityContext context = SecurityContextHolder.createEmptyContext();
   ↓
   b) Set authentication in context
      context.setAuthentication(authentication);
   ↓
   c) Set context in SecurityContextHolder (thread-local variable)
      SecurityContextHolder.setContext(context);
   ↓
   d) Get HTTP Session
      HttpSession session = request.getSession(true);
   ↓
   e) Store context in session
      session.setAttribute(
        "SPRING_SECURITY_CONTEXT_KEY",
        context
      );
   ↓
   f) Return success response: "Login successful"
   ↓
9. On subsequent requests:
   - Session cookie sent by client
   - Spring retrieves SecurityContext from session
   - Authentication available in SecurityContextHolder
   - User identity known for authorization checks
```

### Authorization Flow

```
Request arrives to protected endpoint:
POST /api/posts/create
↓
Spring Security Filter Chain checks:
├─ Is endpoint protected? YES
├─ Is user authenticated? 
│  └─ Check SecurityContextHolder.getContext()
│  └─ Check session for SPRING_SECURITY_CONTEXT_KEY
│  └─ Verify Authentication object exists
│
├─ If NOT authenticated:
│  └─ Return 401 UNAUTHORIZED
│
└─ If authenticated:
   ├─ Extract username from Authentication.getName()
   ├─ Create UserDetails from authenticated user
   ├─ Pass to controller method
   └─ Allow request processing
```

### CustomUserDetailsService Implementation

```java
@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String emailId) 
            throws UsernameNotFoundException {
        // Spring Security calls this method with emailId as "username"
        User user = userRepository.findByEmailId(emailId)
                .orElseThrow(() -> 
                    new UsernameNotFoundException("User not found"));
        // Return CustomUserDetails wrapping the User entity
        return new CustomUserDetails(user);
    }
}
```

### CustomUserDetails Implementation

```java
public class CustomUserDetails implements UserDetails {
    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    // Spring Security required methods:
    
    @Override
    public String getPassword() {
        return user.getPassword();  // Return BCrypt hash from database
    }

    @Override
    public String getUsername() {
        return user.getEmailId();   // Use email as username
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();  // No roles implemented - return empty list
    }

    // Account status flags (all return true in this app)
    @Override
    public boolean isAccountNonExpired() { return true; }
    
    @Override
    public boolean isAccountNonLocked() { return true; }
    
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    
    @Override
    public boolean isEnabled() { return true; }
}
```

### Security Annotations & Checks

```java
// In PostController.createPost():
if (authentication == null 
    || !authentication.isAuthenticated()
    || authentication instanceof AnonymousAuthenticationToken) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                       .body("Login required");
}

// Gets authenticated user's email
String emailId = authentication.getName();

// This is how you check authentication in endpoints
```

---

## SERVICE LAYER - COMPLETE IMPLEMENTATION

### PostService - Blog Post Operations

```java
@Service
public class PostService {
    @Autowired private PostRepository postRepository;
    @Autowired private UserRepository userRepository;

    // CREATE: Associate post with authenticated user
    public Post createPost(Post post, String emailId) {
        if (post == null) return null;
        
        User user = userRepository.findByEmailId(emailId).orElse(null);
        if (user == null) {
            throw new IllegalStateException("Authenticated user not found");
        }
        
        post.setUser(user);  // Associate post with user
        return postRepository.save(post);
    }

    // READ: Get all posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // READ: Get posts by category
    public List<Post> getPostsByCategory(String category) {
        return postRepository.findByCategory(category);
    }

    // DELETE: Delete post by ID (cascade deletes interactions, saved posts)
    public void deletePost(Long id) {
        if (id != null) {
            postRepository.deleteById(id);
        }
    }
}
```

### SearchService - Post Discovery

```java
@Service
public class SearchService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> search(String keyword) {
        // Calls optimized global search query
        return postRepository.globalSearch(keyword);
    }
    
    // Searches:
    // - Description (LONGTEXT field)
    // - Hashtags (#tag1 #tag2 format)
    // - Author name
    // - Category
}
```

### FollowService - Social Graph Management

```java
@Service
@Transactional  // Ensures database operations are committed
public class FollowService {
    @Autowired private FollowRepository followRepository;
    @Autowired private UserRepository userRepository;

    // FOLLOW: Create follow relationship
    public Map<String, Object> followUser(Long followerId, Long followedUserId) {
        Map<String, Object> response = new HashMap<>();

        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User not found"));

        User followed = userRepository.findById(followedUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Validation
        if (followerId.equals(followedUserId)) {
            throw new RuntimeException("Cannot follow yourself");
        }

        if (followRepository.existsByFollowerIdAndFollowedId(
                followerId, followedUserId)) {
            throw new RuntimeException("Already following this user");
        }

        // Create and save relationship
        Followers follow = new Followers();
        follow.setFollower(follower);
        follow.setFollowed(followed);
        Followers savedFollow = followRepository.save(follow);

        // Build detailed response
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

    // UNFOLLOW: Delete follow relationship
    public Map<String, String> unfollowUser(Long followerId, Long followedUserId) {
        Map<String, String> response = new HashMap<>();

        if (!followRepository.existsByFollowerIdAndFollowedId(
                followerId, followedUserId)) {
            throw new RuntimeException("Not following this user");
        }

        followRepository.deleteByFollowerIdAndFollowedId(followerId, followedUserId);

        response.put("success", "true");
        response.put("message", "Successfully unfollowed user");
        return response;
    }

    // CHECK: Is user1 following user2?
    public boolean isFollowing(Long followerId, Long followedId) {
        return followRepository.existsByFollowerIdAndFollowedId(
            followerId, followedId);
    }

    // GETTING FOLLOWING LIST: Who is user X following?
    public List<Map<String, Object>> getFollowingList(Long userId) {
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

    // GETTING FOLLOWERS LIST: Who is following user X?
    public List<Map<String, Object>> getFollowersList(Long userId) {
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

    // COUNTING: How many users is X following?
    public long getFollowingCount(Long userId) {
        return followRepository.countByFollowerId(userId);
    }

    // COUNTING: How many followers does X have?
    public long getFollowersCount(Long userId) {
        return followRepository.countByFollowedId(userId);
    }
}
```

### InteractionService - Likes & Comments

```java
@Service
public class InteractionService {
    @Autowired private InteractionRepository repo;
    @Autowired private PostRepository postRepository;
    @Autowired private UserRepository userRepository;

    // TOGGLE LIKE: Like or unlike a post
    public void toggleLike(Long postId, Long userId) {
        Optional<InteractionEntity> existing =
                repo.findByPostIdAndUserId(postId, userId);

        if(existing.isPresent()) {
            // User already interacted - toggle like status
            InteractionEntity i = existing.get();
            i.setLike(!i.isLike());  // true→false or false→true
            repo.save(i);
            return;
        }

        // First time interacting - create new like
        InteractionEntity i = new InteractionEntity();
        if (postId != null && userId != null) {
            Optional<Post> post = postRepository.findById(postId);
            Optional<User> user = userRepository.findById(userId);
            
            if (post.isPresent() && user.isPresent()) {
                i.setPost(post.get());
                i.setUser(user.get());
                i.setLike(true);
                i.setTime(LocalDateTime.now());
                repo.save(i);
            }
        }
    }

    // ADD COMMENT: Comment on a post
    public void addComment(Long postId, Long userId, String comment) {
        InteractionEntity i = new InteractionEntity();
        if (postId != null && userId != null) {
            Optional<Post> post = postRepository.findById(postId);
            Optional<User> user = userRepository.findById(userId);
            
            if (post.isPresent() && user.isPresent()) {
                i.setPost(post.get());
                i.setUser(user.get());
                i.setComment(comment);
                i.setLike(false);  // Comments have isLike=false
                i.setTime(LocalDateTime.now());
                repo.save(i);
            }
        }
    }
}
```

### SavedPostService - Bookmarking

```java
@Service
public class SavedPostService {
    @Autowired private SavedPostRepository savedPostRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PostRepository postRepository;

    // SAVE: Bookmark a post
    public SavedPost savePost(Long userId, Long postId) {
        if (userId != null && postId != null) {
            Optional<User> user = userRepository.findById(userId);
            Optional<Post> post = postRepository.findById(postId);
            
            if (user.isPresent() && post.isPresent()) {
                SavedPost savedPost = new SavedPost();
                savedPost.setUser(user.get());
                savedPost.setPost(post.get());
                return savedPostRepository.save(savedPost);
            }
        }
        return null;
    }

    // RETRIEVE: Get all saved posts by user
    public List<SavedPost> getAllSavedPostsByUser(Long userId) {
        if (userId != null) {
            return savedPostRepository.findByUserId(userId);
        }
        return null;
    }

    // DELETE: Unsave a post
    public void deleteSavedPost(Long savedPostId) {
        if (savedPostId != null) {
            savedPostRepository.deleteById(savedPostId);
        }
    }
}
```

### UserService - Profile Management

```java
@Service
public class UserService {
    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder passwordEncoder;

    // GET: Retrieve user by ID
    public Optional<User> getUserById(Long id) {
        return userRepo.findById(id);
    }

    // GET: Retrieve user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmailId(email);
    }

    // UPDATE: Update profile (name, bio, profilePic)
    public User updateUserProfile(Long userId, User updatedUser) {
        Optional<User> existingUser = userRepo.findById(userId);
        
        if (!existingUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        
        User user = existingUser.get();
        
        // Selective update - only update provided fields
        if (updatedUser.getName() != null && 
            !updatedUser.getName().isEmpty()) {
            user.setName(updatedUser.getName());
        }
        
        if (updatedUser.getBio() != null && 
            !updatedUser.getBio().isEmpty()) {
            user.setBio(updatedUser.getBio());
        }
        
        if (updatedUser.getProfilePicUrl() != null && 
            !updatedUser.getProfilePicUrl().isEmpty()) {
            user.setProfilePicUrl(updatedUser.getProfilePicUrl());
        }
        
        User savedUser = userRepo.save(user);
        return savedUser != null ? savedUser : user;
    }

    // UPDATE: Change password (with old password verification)
    public User updatePassword(Long userId, String oldPassword, 
                               String newPassword) {
        Optional<User> existingUser = userRepo.findById(userId);
        
        if (!existingUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        
        User user = existingUser.get();
        
        // Verify old password matches
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        
        // Encode and set new password
        user.setPassword(passwordEncoder.encode(newPassword));
        
        return userRepo.save(user);
    }

    // UPDATE: Change email (with uniqueness check)
    public User updateEmail(Long userId, String newEmail) {
        Optional<User> existingUser = userRepo.findById(userId);
        
        if (!existingUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        
        // Check if email already exists for different user
        Optional<User> emailExists = userRepo.findByEmailId(newEmail);
        if (emailExists.isPresent() && 
            emailExists.get().getId() != userId) {
            throw new RuntimeException("Email already in use");
        }
        
        User user = existingUser.get();
        user.setEmailId(newEmail);
        
        return userRepo.save(user);
    }

    // DELETE: Delete user account
    public void deleteUser(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> 
                    new RuntimeException("User not found"));
        userRepo.delete(user);
    }
}
```

### LoginService - Authentication Verification

```java
@Service
public class LoginService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean authenticate(String emailId, String password) {
        User user = userRepository.findByEmailId(emailId).orElse(null);
        
        if (user == null) {
            return false;  // User doesn't exist
        }
        
        // Compare plaintext password with BCrypt hash
        return passwordEncoder.matches(password, user.getPassword());
    }
}
```

### SignUpService - User Registration

```java
@Service
public class SignUpService {
    @Autowired
    private UserRepository repo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        // Encode password before storing
        if (user.getPassword() != null && 
            !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return repo.save(user);
    }
}
```

### AutoCompleteService - Search Suggestions

```java
@Service
public class AutoCompleteService {
    @Autowired
    private PostRepository postRepository;

    public List<String> suggest(String prefix) {
        Set<String> suggestions = new LinkedHashSet<>();

        // Collect suggestions from 3 sources
        suggestions.addAll(postRepository.suggestAuthors(prefix));
        suggestions.addAll(postRepository.suggestHashtags(prefix));
        suggestions.addAll(postRepository.suggestCategories(prefix));

        // Return top 5, removing duplicates
        return suggestions.stream().limit(5).toList();
    }
}
```

---

## REPOSITORY LAYER - DATABASE QUERIES

### UserRepository - User Data Access

```java
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find user by email
    Optional<User> findByEmailId(String emailId);
    // Query: SELECT * FROM users WHERE emailId = ?
    
    // Find user by name
    Optional<User> findByName(String name);
    // Query: SELECT * FROM users WHERE name = ?
}
```

### PostRepository - Post Data Access

```java
public interface PostRepository extends JpaRepository<Post, Long> {
    
    // Find posts by category
    List<Post> findByCategory(String category);
    // Generated query: SELECT * FROM posts WHERE category = ?
    
    // Find posts by user
    List<Post> findByUserId(Long userId);
    // Generated query: SELECT * FROM posts WHERE user_id = ?

    // Description search (case-insensitive)
    List<Post> findByDescriptionContainingIgnoreCase(String keyword);
    // Generated query: SELECT * FROM posts 
    //                 WHERE LOWER(description) LIKE LOWER(CONCAT('%',?,'%'))

    // Hashtag search (case-insensitive)
    List<Post> findByHashtagsContainingIgnoreCase(String keyword);
    // Generated query: SELECT * FROM posts 
    //                 WHERE LOWER(hashtags) LIKE LOWER(CONCAT('%',?,'%'))

    // Author search (case-insensitive)
    List<Post> findByAuthorContainingIgnoreCase(String keyword);
    // Generated query: SELECT * FROM posts 
    //                 WHERE LOWER(author) LIKE LOWER(CONCAT('%',?,'%'))

    // Category search (case-insensitive)
    List<Post> findByCategoryContainingIgnoreCase(String keyword);
    // Generated query: SELECT * FROM posts 
    //                 WHERE LOWER(category) LIKE LOWER(CONCAT('%',?,'%'))

    // GLOBAL SEARCH: Comprehensive search across all fields
    @Query("""
        SELECT p FROM Post p
        WHERE LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR (p.hashtags IS NOT NULL AND LOWER(p.hashtags) LIKE LOWER(CONCAT('%', :keyword,'%')))
        OR LOWER(p.author) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<Post> globalSearch(@Param("keyword")String keyword);
    // Searches description, hashtags, author, category all at once

    // AUTOCOMPLETE: Suggest authors
    @Query("""
        SELECT DISTINCT p.author 
        FROM Post p 
        WHERE LOWER(p.author) LIKE LOWER(CONCAT('%',:prefix, '%'))
    """)
    List<String> suggestAuthors(@Param("prefix") String prefix);
    // Returns distinct author names matching prefix

    // AUTOCOMPLETE: Suggest hashtags
    @Query("""
        SELECT DISTINCT p.hashtags 
        FROM Post p 
        WHERE p.hashtags IS NOT NULL 
        AND LOWER(p.hashtags) LIKE LOWER(CONCAT('%',:prefix, '%'))
    """)
    List<String> suggestHashtags(@Param("prefix") String prefix);
    // Returns distinct hashtag strings matching prefix

    // AUTOCOMPLETE: Suggest categories
    @Query("""
        SELECT DISTINCT p.category 
        FROM Post p 
        WHERE p.category IS NOT NULL 
        AND LOWER(p.category) LIKE LOWER(CONCAT('%',:prefix, '%'))
    """)
    List<String> suggestCategories(@Param("prefix") String prefix);
    // Returns distinct categories matching prefix
}
```

### FollowRepository - Follow Relationship Queries

```java
public interface FollowRepository extends JpaRepository<Followers, Long> {

    // Check if follow relationship exists
    boolean existsByFollowerIdAndFollowedId(Long followerId, Long followedId);
    // Query: SELECT 1 FROM follows WHERE follower_id = ? AND followed_id = ?
    
    // Get all users that a specific user is following
    List<Followers> findByFollowerId(Long followerId);
    // Query: SELECT * FROM follows WHERE follower_id = ?
    
    // Get all followers of a specific user
    List<Followers> findByFollowedId(Long followedId);
    // Query: SELECT * FROM follows WHERE followed_id = ?
    
    // Count how many users a user is following
    long countByFollowerId(Long followerId);
    // Query: SELECT COUNT(*) FROM follows WHERE follower_id = ?
    
    // Count how many followers a user has
    long countByFollowedId(Long followedId);
    // Query: SELECT COUNT(*) FROM follows WHERE followed_id = ?
    
    // Delete a follow relationship
    void deleteByFollowerIdAndFollowedId(Long followerId, Long followedId);
    // Query: DELETE FROM follows WHERE follower_id = ? AND followed_id = ?
}
```

### InteractionRepository - Interaction Queries

```java
public interface InteractionRepository 
        extends JpaRepository<InteractionEntity, Long> {

    // Find interaction between specific user and post
    Optional<InteractionEntity> findByPostIdAndUserId(
            Long postId, Long userId);
    // Query: SELECT * FROM interactions 
    //        WHERE post_id = ? AND user_id = ?
    // Used to check if user already liked post
    
    // Find all interactions (likes/comments) on a post
    List<InteractionEntity> findByPostId(Long postId);
    // Query: SELECT * FROM interactions WHERE post_id = ?
    
    // Find all interactions (likes/comments) by a user
    List<InteractionEntity> findByUserId(Long userId);
    // Query: SELECT * FROM interactions WHERE user_id = ?
}
```

### SavedPostRepository - Saved Post Queries

```java
public interface SavedPostRepository extends JpaRepository<SavedPost, Long> {
    
    // Get all saved posts by a user
    List<SavedPost> findByUserId(Long userId);
    // Query: SELECT * FROM saved_posts WHERE user_id = ?
    
    // Find specific saved post entry by user and post ID
    SavedPost findByUserIdAndPostId(Long userId, Long postId);
    // Query: SELECT * FROM saved_posts WHERE user_id = ? AND post_id = ?
}
```

### LoginRepository (Empty - Not Implemented)

```java
public interface LoginRepository {
    // This repository is not implemented
    // Login logic is handled via Spring Security and UserRepository
}
```

---

## CONTROLLER LAYER - ENDPOINT HANDLERS

(Controllers detailed in API Documentation section)

All controllers follow pattern:
```
@RestController              // Marks as REST endpoint handler
@RequestMapping("/api/...")  // URL prefix
public class XxxController {
    @Autowired
    private XxxService service;
    
    @PostMapping, @GetMapping, @PutMapping, @DeleteMapping
    public ResponseEntity<?> method(...) {
        // Input validation
        // Call service
        // Return appropriate response
    }
}
```

---

## REQUEST/RESPONSE MODELS

### SignUp Request Model

```json
{
  "name": "string",
  "numberPassword": "string",
  "emailId": "string@example.com",
  "bio": "string (optional)",
  "profilePicUrl": "string (optional)"
}
```

### Login Request

```
Parameters: emailId, password (query params)
```

### Create Post Request

```json
{
  "category": "string (max 100)",
  "description": "string (LONGTEXT)",
  "image": "string (optional)",
  "author": "string",
  "hashtags": "string (optional)"
}
```

### Update Profile Request

```json
{
  "name": "string (optional)",
  "bio": "string (optional)",
  "profilePicUrl": "string (optional)"
}
```

### Password Update Request

```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

### Email Update Request

```json
{
  "newEmail": "string@example.com"
}
```

---

## DATABASE CONFIGURATION

### Application Properties

```properties
# Application metadata
spring.application.name=blog
server.port=8090

# MySQL Database Connection
spring.datasource.url=jdbc:mysql://localhost:3306/blog_app
spring.datasource.username=Venkat
spring.datasource.password=vcc.20071
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
# Options:
# - create: Drop tables and recreate (loses data)
# - create-drop: Create on startup, drop on shutdown
# - update: Alter tables to match entities (recommended for development)
# - validate: Just check if schema matches entities
# - none: Do nothing

spring.jpa.show-sql=true
# Logs all generated SQL queries to console (development only)

spring.jpa.properties.hibernate.format_sql=true
# Formats logged SQL for readability
```

### Database Setup

```sql
-- Create database
CREATE DATABASE blog_app;

-- Use database
USE blog_app;

-- Tables are auto-created by Hibernate when application starts
-- Entities are mapped as follows:
-- User → users
-- Post → posts
-- Followers → follows
-- InteractionEntity → interactions
-- SavedPost → saved_posts
-- SignUp → users (same table as User)
```

### Connection Details

```
Host: localhost
Port: 3306
Database: blog_app
Username: Venkat
Password: vcc.20071
Driver: mysql-connector-j (com.mysql.cj.jdbc.Driver)
```

---

## STEP-BY-STEP EXECUTION FLOW

### Complete User Journey Example

#### Step 1: User Signup

```
USER ACTION: Call POST /api/signup
              {name: "John", emailId: "john@email.com", password: "pass123"}

CONTROLLER FLOW:
  → SignUpController.signup() receives request
  → Validates: email, password, name not empty ✓
  → Calls SignUpService.registerUser(user)

SERVICE FLOW:
  → SignUpService checks if password provided
  → Calls PasswordEncoder.encode("pass123")
  → BCrypt generates hash: "$2a$10$M9.cG..." ✓
  → Sets hashed password on user entity
  → Calls UserRepository.save(user)

REPOSITORY FLOW:
  → Executes INSERT query:
    INSERT INTO users (name, emailId, password, bio, profilePicUrl)
    VALUES ('John', 'john@email.com', '$2a$10$M9.cG...', NULL, NULL)
  → Database generates auto id = 1
  → Returns saved User entity

RESPONSE TO USER:
  → HTTP 201 CREATED
  → {"message": "User registered successfully"}
  → User status: CREATED (not authenticated yet)
```

#### Step 2: User Login

```
USER ACTION: Call POST /api/login?emailId=john@email.com&password=pass123

CONTROLLER FLOW:
  → LoginController.login() receives request
  → Validates: emailId and password not empty ✓
  → Creates UsernamePasswordAuthenticationToken("john@email.com", "pass123")
  → Calls authenticationManager.authenticate(token)

AUTHENTICATION MANAGER FLOW:
  → Routes to DaoAuthenticationProvider
  → Calls CustomUserDetailsService.loadUserByUsername("john@email.com")

CUSTOM USER DETAILS SERVICE:
  → Queries UserRepository.findByEmailId("john@email.com")
  → Retrieved User entity from database
  → Wraps in CustomUserDetails object
  → Returns to AuthenticationManager

DAO AUTHENTICATION PROVIDER:
  → Gets CustomUserDetails with user data and hashed password
  → Calls PasswordEncoder.matches("pass123", "$2a$10$M9.cG...")
  → BCrypt library verifies:
    ✓ Hash matches password hash from database
    ✓ Returns true

AUTHENTICATION MANAGER:
  → Authentication successful ✓
  → Creates Authentication object with:
    - username: "john@email.com"
    - authenticated: true
    - principal: CustomUserDetails

SECURITY CONTEXT SETUP:
  → LoginController creates new SecurityContext
  → Sets Authentication on SecurityContext
  → Stores SecurityContext in SecurityContextHolder (thread-local)
  → Gets HttpSession from request (creates if needed)
  → Stores SecurityContext in session attribute
  → Browser receives session cookie (JSESSIONID)

RESPONSE TO USER:
  → HTTP 200 OK
  → {"message": "Login successful"}
  → User status: AUTHENTICATED
  → Session established
```

#### Step 3: Create Post (Authenticated)

```
USER ACTION: Call POST /api/posts/create with session cookie
             {category: "Tech", description: "Spring Boot guide...", author: "John"}

REQUEST PROCESSING:
  → HTTP request arrives with Cookie: JSESSIONID=abc123...
  → Spring Security filter intercepts request
  → Checks if /api/posts/create needs authentication: YES
  → Retrieves session from JSESSIONID cookie
  → Gets SecurityContext from session
  → Gets Authentication from SecurityContext
  → Verifies Authentication is not null and isAuthenticated() = true ✓
  → Stores Authentication in SecurityContextHolder (thread-local)

CONTROLLER FLOW:
  → PostController.createPost(post, authentication) called
  → Checks: authentication != null && isAuthenticated() && not AnonymousAuthenticationToken ✓
  → Extracts username: authentication.getName() = "john@email.com"
  → Calls PostService.createPost(post, "john@email.com")

SERVICE FLOW:
  → PostService.createPost() receives post and emailId
  → Calls UserRepository.findByEmailId("john@email.com")
  → Retrieved User entity (id=1, name='John', emailId='john@email.com')
  → Sets post.setUser(retrievedUser)
  → Calls PostRepository.save(post)

REPOSITORY FLOW:
  → Executes INSERT query:
    INSERT INTO posts (category, description, image, author, time, hashtags, user_id)
    VALUES ('Tech', 'Spring Boot guide...', NULL, 'John', NOW(), NULL, 1)
  → Database generates auto id = 1
  → Returns saved Post entity

RESPONSE TO USER:
  → HTTP 200 OK
  → Return Post object with id, user data, etc.
  → Post successfully created and associated with user
```

#### Step 4: Follow User

```
USER ACTION: Call POST /api/follow?followerId=1&followedUserId=2

CONTROLLER FLOW:
  → FollowController.follow(followerId=1, followedUserId=2) called
  → Calls FollowService.followUser(1, 2)

SERVICE FLOW:
  → Retrieves User #1 from UserRepository
  → Retrieves User #2 from UserRepository
  → Validates: user1 != user2 ✓ (not self-following)
  → Checks: !existsByFollowerIdAndFollowedId(1, 2) ✓ (not already following)
  → Creates new Followers entity
  → Sets follower = user1
  → Sets followed = user2
  → Calls FollowRepository.save()

REPOSITORY FLOW:
  → Executes INSERT query:
    INSERT INTO follows (follower_id, followed_id)
    VALUES (1, 2)
  → Database generates auto id = 10
  → Returns saved Followers entity

RESPONSE TO USER:
  → HTTP 200 OK
  → {"success": true, "message": "Successfully followed user", ...}
  → User relationship established
```

---

## FEATURE EXPLANATIONS

### 1. Discovery Engine (Search & Hashtags)

**What it does**: Allow users to find posts based on search queries

**How it works**:
```
Global Search Flow:
User enters search query "spring boot"
        ↓
SearchController receives query
        ↓
SearchService.search("spring boot")
        ↓
PostRepository.globalSearch("spring boot")
        ↓
SQL Query with LIKE conditions:
  - Match in description column
  - Match in hashtags column
  - Match in author column
  - Match in category column
        ↓
Matching posts returned
        ↓
User sees relevant results
```

**Autocomplete Feature**:
```
User types "spr" as prefix
        ↓
AutoCompleteController.suggest("spr")
        ↓
Queries for matching:
  - Authors starting with "spr"
  - Hashtags containing "spr"
  - Categories starting with "spr"
        ↓
Returns combined list (with duplicates removed)
        ↓
Limited to top 5 suggestions
        ↓
User sees dropdown suggestions
```

### 2. Social Graph (Follow/Followers)

**What it does**: Build social connections between users

**Key Components**:
```
Followers Entity Structure:
┌─ follower (User ID: 1) → John Doe
└─ followed (User ID: 5) → Jane Smith

Interpretation: John follows Jane

Multiple follows create social network:
User 1 follows Users: 5, 8, 12        (User 1's following list)
Users 2, 3, 9 follow User 1           (User 1's followers list)
```

**Use Cases**:
```
1. Follow user: Create directed relationship
2. Unfollow user: Delete relationship
3. Check if following: Query relationship exists
4. Get following list: Show who user follows
5. Get followers: Show who follows user
6. Count metrics: Track follower/following numbers
```

### 3. Personal Curation (Saved Posts)

**What it does**: Let users bookmark interesting posts

**Flow**:
```
User finds interesting post #10
        ↓
Calls: POST /api/saved-posts/user/5/post/10
        ↓
SavedPostService creates SavedPost entity
  - user_id = 5
  - post_id = 10
        ↓
Record stored in saved_posts table
        ↓
User can retrieve later: GET /api/saved-posts/user/5
        ↓
Returns list of all bookmarked posts
```

**Database Table**:
```
saved_posts
├─ id (primary key)
├─ user_id (foreign key) → users
├─ post_id (foreign key) → posts
└─ Special Note: Many-to-many relationship (User can save many Posts)
```

### 4. Interactions (Likes & Comments)

**What it does**: Allow engagement with posts

**Like Mechanism**:
```
First like action:
  - User clicks like button on Post #5
  - Creates InteractionEntity
  - isLike = true
  - Stored in interactions table
  
User clicks like button again (same post):
  - Finds existing interaction
  - Toggles isLike: true → false (unlike)
  
User clicks like button again:
  - Toggles isLike: false → true (re-like)
```

**Comment Mechanism**:
```
User writes comment on Post #5:
  - Creates InteractionEntity
  - isLike = false
  - comment = "Great post!"
  - Stored in interactions table
  
Multiple comments allowed:
  - Creates new record for each comment
  - Each comment is separate interaction record
```

---

## SETUP & DEPLOYMENT

### Prerequisites

```
1. Java Development Kit (JDK) 17
   - Download from: https://adoptopenjdk.net/ or oracle.com
   - Verify: java -version

2. Maven 3.6+
   - Download from: https://maven.apache.org/download.cgi
   - Verify: mvn --version
   - OR use mvnw wrapper provided in project

3. MySQL 5.7+ or 8.0
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Service running on localhost:3306

4. IDE/Editor
   - VS Code
   - IntelliJ IDEA
   - Eclipse
```

### Local Development Setup

**Step 1: Clone/Download Project**
```bash
# Navigate to project directory
cd BlogApp
```

**Step 2: Database Setup**
```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE blog_app;

# Verify creation
SHOW DATABASES;

# Exit MySQL
EXIT;
```

**Step 3: Update Database Credentials** (if different)
```properties
# Edit: src/main/resources/application.properties
spring.datasource.username=your_mysql_user
spring.datasource.password=your_mysql_password
```

**Step 4: Build Project**
```bash
# Option 1: Using mvnw wrapper (recommended)
./mvnw clean install   # Linux/Mac
mvnw.cmd clean install # Windows

# Option 2: Using installed Maven
mvn clean install
```

**Step 5: Run Application**
```bash
# Option 1: Using Maven
mvn spring-boot:run

# Option 2: From IDE
- Run BlogApplication.java main method

# Wait for output:
# "Started BlogApplication in X.XXX seconds"
```

**Step 6: Verify Application**
```bash
# Test health endpoint
curl http://localhost:8090/api/posts/all

# Should return: [] (empty array)
```

### API Testing with Postman

**Get Postman**: Download from https://www.postman.com/downloads/

**Import Settings**:
```
Base URL: http://localhost:8090
Timeout: 30000ms
```

**Test Flow**:
```
1. Create account:
   POST http://localhost:8090/api/signup
   Body: {"name":"John","emailId":"john@test.com","password":"pass123"}

2. Login:
   POST http://localhost:8090/api/login?emailId=john@test.com&password=pass123

3. Create post:
   POST http://localhost:8090/api/posts/create
   Body: {"category":"Tech","description":"Test","author":"John"}

4. Get all posts:
   GET http://localhost:8090/api/posts/all

5. Search:
   GET http://localhost:8090/api/search?q=Test
```

---

## TESTING GUIDE

### Unit Testing Approach

```
BlogApplicationTests.java
├─ Application context loads
├─ Database connection established
└─ Beans properly wired
```

**Running Tests**:
```bash
mvn test
```

### Manual Testing Checklist

**Authentication**:
- [ ] Can register new user
- [ ] Can login with correct credentials
- [ ] Cannot login with wrong password
- [ ] Session created after login
- [ ] Cannot access secure endpoints without login

**Posts**:
- [ ] Can create post when authenticated
- [ ] Cannot create post when not authenticated
- [ ] Can retrieve all posts
- [ ] Can filter posts by category
- [ ] Can delete posts
- [ ] Post timestamp auto-generated

**Search**:
- [ ] Can search by keyword
- [ ] Search is case-insensitive
- [ ] Can get autocomplete suggestions
- [ ] Autocomplete returns max 5 results

**Follow**:
- [ ] Can follow user
- [ ] Cannot follow self
- [ ] Cannot follow same user twice
- [ ] Can unfollow user
- [ ] Can check if following
- [ ] Following list returns correct users
- [ ] Followers list returns correct users
- [ ] Counts are accurate

**Interactions**:
- [ ] Can like post
- [ ] Can unlike post (toggle)
- [ ] Can re-like post
- [ ] Can add comment
- [ ] Multiple comments allowed

**SavedPosts**:
- [ ] Can save post
- [ ] Can retrieve saved posts
- [ ] Cannot save non-existent post

**User Profile**:
- [ ] Can view profile
- [ ] Can update profile info
- [ ] Can change password
- [ ] Can change email (unique check)
- [ ] Cannot use existing email

---

## ERROR HANDLING

### Common Errors & Solutions

**Error**: `No database connection`
```
Solution:
1. Verify MySQL is running
2. Check connection string in application.properties
3. Verify credentials (Venkat / vcc.20071)
4. Check database exists: SHOW DATABASES;
```

**Error**: `401 Unauthorized`
```
Solution:
1. Must login first for protected endpoints
2. Verify session cookie included
3. Check authentication status
```

**Error**: `User not found`
```
Solution:
1. Email doesn't exist in database
2. Check email spelling
3. Signup first if new user
```

**Error**: `Unique constraint violation on emailId`
```
Solution:
1. Email already registered
2. Use different email address
3. Login with existing account instead
```

**Error**: `Already following this user`
```
Solution:
1. Cannot follow same user twice
2. Unfollow first then refollow if needed
```

---

## PERFORMANCE OPTIMIZATION

### Current Implementation Optimization Notes

**Lazy Loading**:
```java
@ManyToOne(fetch=FetchType.LAZY)  // Only load when accessed
private User user;

// Benefits:
// - Reduces initial query load
// - Only queries what's needed
// - Prevents N+1 query problems (mostly)
```

**Index Recommendations**:
```sql
-- Add these for faster queries:
CREATE INDEX idx_user_email ON users(emailId);
CREATE INDEX idx_post_category ON posts(category);
CREATE INDEX idx_post_author ON posts(author);
CREATE INDEX idx_follow_follower ON follows(follower_id);
CREATE INDEX idx_follow_followed ON follows(followed_id);
CREATE INDEX idx_interaction_post ON interactions(post_id);
CREATE INDEX idx_interaction_user ON interactions(user_id);
CREATE INDEX idx_saved_user ON saved_posts(user_id);
CREATE INDEX idx_saved_post ON saved_posts(post_id);
```

**Query Optimization**:
```java
// Use DISTINCT to avoid duplicates
@Query("SELECT DISTINCT p.author FROM Post p ...")

// Use LIMIT to restrict results
List<String> suggest(...).stream().limit(5).toList()

// Use LinkedHashSet to remove duplicates efficiently
Set<String> suggestions = new LinkedHashSet<>();
```

**Future Improvements**:
```
1. Pagination: Add Page<T> for large result sets
2. Caching: @Cacheable on frequent queries
3. Batch Operations: Insert multiple records at once
4. Connection Pooling: HikariCP for better performance
5. Query Optimization: Add @NamedQueries for complex queries
```

---

## BEST PRACTICES IMPLEMENTED

### 1. Layered Architecture
```
Controller (Request/Response)
    ↓
Service (Business Logic)
    ↓
Repository (Data Access)
    ↓
Database
```

### 2. Security Best Practices
- ✓ BCrypt password hashing (not plaintext)
- ✓ Spring Security integration
- ✓ Session-based authentication
- ✓ Password fields marked Write-Only in JSON
- ✓ Authentication checks on protected endpoints

### 3. ORM Best Practices
- ✓ Lazy loading on relationships
- ✓ Cascade delete properly configured
- ✓ Foreign key constraints
- ✓ Proper relationship mappings
- ✓ orphanRemoval for parent-child relationships

### 4. API Design
- ✓ RESTful endpoints (noun-based URLs)
- ✓ Appropriate HTTP methods (GET/POST/PUT/DELETE)
- ✓ Standard HTTP status codes
- ✓ Consistent response formats
- ✓ Error messages in responses

### 5. Error Handling
- ✓ Input validation before processing
- ✓ Meaningful error messages
- ✓ Appropriate HTTP status codes
- ✓ Try-catch blocks where needed
- ✓ Null checks before operations

### 6. Code Quality
- ✓ Lombok for boilerplate reduction
- ✓ Dependency injection via @Autowired
- ✓ Service layer for business logic separation
- ✓ Repository pattern for data access
- ✓ Comments explaining complex logic

### 7. Database Design
- ✓ Proper foreign keys and relationships
- ✓ Cascade operations configured
- ✓ Unique constraints (emailId)
- ✓ Null constraints appropriately used
- ✓ Timestamp auto-generation

---

## DIRECTORY TREE (COMPLETE PROJECT STRUCTURE)

```
BlogApp/
│
├── pom.xml                        ← Maven POM file with dependencies
├── mvnw                          ← Maven wrapper script (Linux/Mac)
├── mvnw.cmd                      ← Maven wrapper script (Windows)
├── README.md                     ← Project documentation
│
├── src/
│   ├── main/
│   │   ├── java/com/example/blog/
│   │   │   ├── BlogApplication.java
│   │   │   │   └── @SpringBootApplication
│   │   │   │       Main entry point - runs when: mvn spring-boot:run
│   │   │   │
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java
│   │   │   │       └── @Configuration @EnableWebSecurity
│   │   │   │           ├── BCryptPasswordEncoder bean
│   │   │   │           ├── DaoAuthenticationProvider bean
│   │   │   │           ├── AuthenticationManager bean
│   │   │   │           └── SecurityFilterChain bean
│   │   │   │
│   │   │   ├── Controller/
│   │   │   │   ├── LoginController.java
│   │   │   │   │   └── POST /api/login
│   │   │   │   ├── SignUpController.java
│   │   │   │   │   └── POST /api/signup
│   │   │   │   ├── PostController.java
│   │   │   │   │   ├── POST /api/posts/create (protected)
│   │   │   │   │   ├── GET /api/posts/all
│   │   │   │   │   ├── GET /api/posts/category/{category}
│   │   │   │   │   └── DELETE /api/posts/delete/{id}
│   │   │   │   ├── SearchController.java
│   │   │   │   │   └── GET /api/search?q=query
│   │   │   │   ├── FollowController.java
│   │   │   │   │   ├── POST /api/follow
│   │   │   │   │   ├── DELETE /api/follow
│   │   │   │   │   ├── GET /api/follow/check
│   │   │   │   │   ├── GET /api/follow/following
│   │   │   │   │   ├── GET /api/follow/followers
│   │   │   │   │   ├── GET /api/follow/following/count
│   │   │   │   │   └── GET /api/follow/followers/count
│   │   │   │   ├── InteractionController.java
│   │   │   │   │   ├── POST /api/interactions/like
│   │   │   │   │   └── POST /api/interactions/comment
│   │   │   │   ├── SavedPostController.java
│   │   │   │   │   ├── POST /api/saved-posts/user/{uid}/post/{pid}
│   │   │   │   │   └── GET /api/saved-posts/user/{userId}
│   │   │   │   ├── UserController.java
│   │   │   │   │   ├── GET /api/user/{id}
│   │   │   │   │   ├── PUT /api/user/{id}
│   │   │   │   │   ├── PUT /api/user/{id}/password
│   │   │   │   │   └── PUT /api/user/{id}/email
│   │   │   │   └── AutoCompleteController.java
│   │   │   │       └── GET /api/search/suggest?prefix=prefix
│   │   │   │
│   │   │   ├── Service/
│   │   │   │   ├── LoginService.java
│   │   │   │   │   └── authenticate(email, password)
│   │   │   │   ├── SignUpService.java
│   │   │   │   │   └── registerUser(user)
│   │   │   │   ├── PostService.java
│   │   │   │   │   ├── createPost(post, emailId)
│   │   │   │   │   ├── getAllPosts()
│   │   │   │   │   ├── getPostsByCategory(category)
│   │   │   │   │   └── deletePost(id)
│   │   │   │   ├── SearchService.java
│   │   │   │   │   └── search(keyword)
│   │   │   │   ├── FollowService.java
│   │   │   │   │   ├── followUser(followerId, followedUserId)
│   │   │   │   │   ├── unfollowUser(followerId, followedUserId)
│   │   │   │   │   ├── isFollowing(followerId, followedId)
│   │   │   │   │   ├── getFollowingList(userId)
│   │   │   │   │   ├── getFollowersList(userId)
│   │   │   │   │   ├── getFollowingCount(userId)
│   │   │   │   │   └── getFollowersCount(userId)
│   │   │   │   ├── InteractionService.java
│   │   │   │   │   ├── toggleLike(postId, userId)
│   │   │   │   │   └── addComment(postId, userId, comment)
│   │   │   │   ├── SavedPostService.java
│   │   │   │   │   ├── savePost(userId, postId)
│   │   │   │   │   ├── getAllSavedPostsByUser(userId)
│   │   │   │   │   └── deleteSavedPost(savedPostId)
│   │   │   │   ├── UserService.java
│   │   │   │   │   ├── getUserById(id)
│   │   │   │   │   ├── getUserByEmail(email)
│   │   │   │   │   ├── updateUserProfile(userId, updatedUser)
│   │   │   │   │   ├── updatePassword(userId, oldPassword, newPassword)
│   │   │   │   │   ├── updateEmail(userId, newEmail)
│   │   │   │   │   └── deleteUser(id)
│   │   │   │   ├── AutoCompleteService.java
│   │   │   │   │   └── suggest(prefix)
│   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   │   └── loadUserByUsername(emailId)
│   │   │   │   └── CustomUserDetails.java
│   │   │   │       └── Implements UserDetails
│   │   │   │
│   │   │   ├── Repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── findByEmailId(emailId)
│   │   │   │   │   └── findByName(name)
│   │   │   │   ├── PostRepository.java
│   │   │   │   │   ├── findByCategory(category)
│   │   │   │   │   ├── findByUserId(userId)
│   │   │   │   │   ├── globalSearch(keyword)
│   │   │   │   │   ├── suggestAuthors(prefix)
│   │   │   │   │   ├── suggestHashtags(prefix)
│   │   │   │   │   └── suggestCategories(prefix)
│   │   │   │   ├── FollowRepository.java
│   │   │   │   │   ├── existsByFollowerIdAndFollowedId(fid, foid)
│   │   │   │   │   ├── findByFollowerId(followerId)
│   │   │   │   │   ├── findByFollowedId(followedId)
│   │   │   │   │   ├── countByFollowerId(followerId)
│   │   │   │   │   ├── countByFollowedId(followedId)
│   │   │   │   │   └── deleteByFollowerIdAndFollowedId(fid, foid)
│   │   │   │   ├── InteractionRepository.java
│   │   │   │   │   ├── findByPostIdAndUserId(postId, userId)
│   │   │   │   │   ├── findByPostId(postId)
│   │   │   │   │   └── findByUserId(userId)
│   │   │   │   ├── SavedPostRepository.java
│   │   │   │   │   ├── findByUserId(userId)
│   │   │   │   │   └── findByUserIdAndPostId(userId, postId)
│   │   │   │   └── LoginRepository.java
│   │   │   │       └── (Empty - not implemented)
│   │   │   │
│   │   │   └── Entity/
│   │   │       ├── User.java
│   │   │       │   └── @Entity @Table("users")
│   │   │       │       OneToMany→Post, InteractionEntity, SavedPost
│   │   │       ├── Post.java
│   │   │       │   └── @Entity @Table("posts")
│   │   │       │       ManyToOne→User
│   │   │       │       OneToMany→InteractionEntity, SavedPost
│   │   │       ├── Followers.java
│   │   │       │   └── @Entity @Table("follows")
│   │   │       │       ManyToOne→User (follower)
│   │   │       │       ManyToOne→User (followed)
│   │   │       ├── InteractionEntity.java
│   │   │       │   └── @Entity @Table("interactions")
│   │   │       │       ManyToOne→Post
│   │   │       │       ManyToOne→User
│   │   │       ├── SavedPost.java
│   │   │       │   └── @Entity @Table("saved_posts")
│   │   │       │       ManyToOne→User
│   │   │       │       ManyToOne→Post
│   │   │       └── SignUp.java
│   │   │           └── @Entity @Table("users")
│   │   │               (Mirrors User entity)
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │           └── Database & JPA configuration
│   │
│   └── test/
│       └── java/com/example/blog/
│           └── BlogApplicationTests.java
│               └── Basic Spring Boot test configuration
│
├── target/                        ← Compiled code (auto-generated)
│   ├── classes/
│   │   └── (Compiled Java classes and resources)
│   ├── generated-sources/
│   │   └── (Generated code if any)
│   └── test-classes/
│       └── (Compiled test classes)
│
└── .gitignore                    ← Git ignore patterns
```

---

## SUMMARY

BlogApp is a fully functional Spring Boot REST API for a social blogging platform with:
- **9 REST Controllers** handling authentication, posts, search, social features
- **9 Service classes** implementing business logic
- **6 Repositories** for database operations
- **6 Entities** with complex relationships
- **23+ API endpoints** covering user management, posts, search, social features, and bookmarking
- **Spring Security** integration with BCrypt password hashing
- **Session-based authentication** with SecurityContext
- **MySQL database** with 5 main tables and cascade operations
- **Lazy loading** and **cascade deletes** for performance and data integrity
- **Advanced search** with autocomplete suggestions
- **Social graph** for following/followers
- **Like/Comment system** for post interactions
- **Bookmark system** for personal curation

This comprehensive documentation covers every aspect of the BlogApp project from database design to API endpoints to complete code implementations.

---

**Document Created**: February 10, 2026
**Project Version**: 0.0.1-SNAPSHOT
**Java Version**: 17
**Spring Boot Version**: 3.5.10

import Post from "../models/post.model.js";

// @desc    Create a new post
// @route   POST /api/v1/posts/create
export const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || age === undefined || age === null) {
            return res.status(400).json({
                message: "name, description, and age are required"
            });
        }

        const post = await Post.create({
            name: name.trim(),
            description: description.trim(),
            age: Number(age)
        });

        return res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
};

// @desc    Get all posts
// @route   GET /api/v1/posts/get-posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching posts",
            error: error.message
        });
    }
};

// @desc    Update post by ID
// @route   PATCH /api/v1/posts/update/:id
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Request body cannot be empty"
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating post",
            error: error.message
        });
    }
};

// @desc    Delete post by ID
// @route   DELETE /api/v1/posts/delete/:id
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting post",
            error: error.message
        });
    }
};

import mongoose, {Schema, Types} from "mongoose";

const commentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: "Comment", required: true},
  content: {type: String, required: true},
  date: {type: Date, default: Date.now},
});

const likeSchema = new Schema({
  blogId: {type: Schema.Types.ObjectId, ref: "Blog", required: true},
  userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
  likedAt: {type: Date, default: Date.now},
});

export interface BlogRequestBody {
  title: string;
  author: Types.ObjectId;
  image?: string;
  content: string;
  categories?: string[];
  tags?: string[];
}

interface BlogRequestSchema extends BlogRequestBody {
  createdAt: Date;
  updatedAt: Date;
  published?: boolean;
  views?: number;
  likes?: number;
  likedBy?: Types.ObjectId[];
  comments?: any[];
}

const blogSchema = new Schema<BlogRequestSchema>(
  {
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    image: String,
    content: {type: String, required: true},
    categories: [String],
    tags: [String],
    published: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    comments: [commentSchema],
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    likedBy: [{type: Schema.Types.ObjectId, ref: "User"}],
  },
  {timestamps: true},
);

export const Blog = mongoose.model("Blog", blogSchema);
export const Like = mongoose.model("Like", likeSchema);
export const Comment = mongoose.model("Comment", commentSchema);

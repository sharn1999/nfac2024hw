"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/lecture1');
        console.log('MongoDB connected...');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
exports.default = connectDB;
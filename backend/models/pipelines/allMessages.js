import mongoose from "mongoose";

export default function allMessages(user, id) {
    return [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
                participants: { $in: [new mongoose.Types.ObjectId(user)] },
            },
        },
        {
            $lookup: {
                from: "messages",
                localField: "messages",
                foreignField: "_id",
                as: "messages",
            },
        },
        {
            $project: {
                messages: 1,
                _id: 0,
            },
        },
        {
            $unwind: "$messages",
        },
        {
            $lookup: {
                from: "chatusers",
                localField: "messages.sender",
                foreignField: "_id",
                as: "messages.sender",
            },
        },
        {
            $unwind: "$messages.sender",
        },
        {
            $addFields: {
                "messages.sender": {
                    $cond: {
                        if: {
                            $eq: [
                                "$messages.sender._id",
                                new mongoose.Types.ObjectId(user),
                            ],
                        },
                        then: "You",
                        else: "$messages.sender.name",
                    },
                },
            },
        },
        {
            $replaceRoot: { newRoot: "$messages" },
        },
        {
            $sort: { _id: 1 },
        },
    ];
}

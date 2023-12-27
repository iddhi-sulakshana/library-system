import mongoose from "mongoose";
export default function allChats(id) {
    return [
        {
            $match: {
                participants: {
                    $in: [new mongoose.Types.ObjectId(id)],
                },
            },
        },
        {
            $lookup: {
                from: "chatusers",
                localField: "participants",
                foreignField: "_id",
                as: "participants",
            },
        },
        {
            $project: {
                participant: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$participants",
                                as: "participant",
                                cond: {
                                    $ne: [
                                        "$$participant._id",
                                        new mongoose.Types.ObjectId(id),
                                    ],
                                },
                            },
                        },
                        0,
                    ],
                },
                messages: 1,
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
                participant: 1,
                latestMessage: {
                    $let: {
                        vars: {
                            latestMessage: { $arrayElemAt: ["$messages", -1] },
                        },
                        in: {
                            message: "$$latestMessage.message",
                            timestamp: "$$latestMessage.timestamp",
                        },
                    },
                },
            },
        },
    ];
}

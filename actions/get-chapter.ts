// import { db } from "@/lib/db";
// import { Attachment, Chapter } from "@prisma/client";

// interface GetChapterProps {
//   userId: string;
//   courseId: string;
//   chapterId: string;
// }

// export const getChapter = async ({
//   userId,
//   courseId,
//   chapterId,
// }: GetChapterProps) => {
//   try {
//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId,
//           courseId,
//         },
//       },
//     });

//     const course = await db.course.findUnique({
//       where: {
//         isPublished: true,
//         id: courseId,
//       },
//       select: {
//         price: true,
//       },
//     });

//     const chapter = await db.chapter.findUnique({
//       where: {
//         id: chapterId,
//         isPublished: true,
//       },
//     });

//     if (!chapter || !course) {
//       throw new Error("Chapter or course not found");
//     }

//     let muxData = null;
//     let attachments: Attachment[] = [];
//     let nextChapter: Chapter | null = null;

//     if (purchase) {
//       attachments = await db.attachment.findMany({
//         where: {
//           courseId: courseId,
//         },
//       });
//     }

//     if (chapter.isFree || purchase) {
//       muxData = await db.muxData.findUnique({
//         where: {
//           chapterId: chapterId,
//         },
//       });

//       nextChapter = await db.chapter.findFirst({
//         where: {
//           courseId: courseId,
//           isPublished: true,
//           position: {
//             gt: chapter?.position,
//           },
//         },
//         orderBy: {
//           position: "asc",
//         },
//       });
//     }

//     const userProgress = await db.userProgress.findUnique({
//       where: {
//         userId_chapterId: {
//           userId,
//           chapterId,
//         },
//       },
//     });

//     return {
//       chapter,
//       course,
//       muxData,
//       attachments,
//       nextChapter,
//       userProgress,
//       purchase,
//     };
//   } catch (error) {
//     console.log("[GET_CHAPTER]", error);
//     return {
//       chapter: null,
//       course: null,
//       muxData: null,
//       attachments: [],
//       nextChapter: null,
//       userProgress: null,
//       purchase: null,
//     };
//   }
// };

// import { db } from "@/lib/db";
// import { Attachment, Chapter } from "@prisma/client";

// interface GetChapterProps {
//   userId: string;
//   courseId: string;
//   chapterId: string;
// }

// export const getChapter = async ({
//   userId,
//   courseId,
//   chapterId,
// }: GetChapterProps) => {
//   try {
//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId,
//           courseId,
//         },
//       },
//     });

//     const course = await db.course.findUnique({
//       where: {
//         isPublished: true,
//         id: courseId,
//       },
//       select: {
//         price: true,
//       },
//     });

//     const chapter = await db.chapter.findUnique({
//       where: {
//         id: chapterId,
//         isPublished: true,
//       },
//     });

//     if (!chapter || !course) {
//       throw new Error("Chapter or course not found");
//     }

//     let muxData = null;
//     let attachments: Attachment[] = [];
//     let nextChapter: Chapter | null = null;

//     if (purchase) {
//       attachments = await db.attachment.findMany({
//         where: {
//           courseId: courseId,
//         },
//       });
//     }

//     if (chapter.isFree || purchase) {
//       muxData = await db.muxData.findUnique({
//         where: {
//           chapterId: chapterId,
//         },
//       });

//       nextChapter = await db.chapter.findFirst({
//         where: {
//           courseId: courseId,
//           isPublished: true,
//           position: {
//             gt: chapter?.position,
//           },
//         },
//         orderBy: {
//           position: "asc",
//         },
//       });
//     }

//     const userProgress = await db.userProgress.findUnique({
//       where: {
//         userId_chapterId: {
//           userId,
//           chapterId,
//         },
//       },
//     });

//     // Fetch all chapters and check if all are completed
//     const allChapters = await db.chapter.findMany({
//       where: {
//         courseId: courseId,
//         isPublished: true,
//       },
//       orderBy: {
//         position: "asc",
//       },
//     });

//     const completedChapters = await db.userProgress.findMany({
//       where: {
//         userId: userId,
//         chapterId: {
//           in: allChapters.map((ch) => ch.id),
//         },
//         isCompleted: true,
//       },
//     });

//     const isCourseCompleted = completedChapters.length === allChapters.length;

//     return {
//       chapter,
//       course,
//       muxData,
//       attachments,
//       nextChapter,
//       userProgress,
//       purchase,
//       isCourseCompleted,
//     };
//   } catch (error) {
//     console.log("[GET_CHAPTER]", error);
//     return {
//       chapter: null,
//       course: null,
//       muxData: null,
//       attachments: [],
//       nextChapter: null,
//       userProgress: null,
//       purchase: null,
//       isCourseCompleted: false,
//     };
//   }
// };

import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    // Fetch all chapters and check if all are completed
    const allChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      orderBy: {
        position: "asc",
      },
    });

    const completedChapters = await db.userProgress.findMany({
      where: {
        userId: userId,
        chapterId: {
          in: allChapters.map((ch) => ch.id),
        },
        isCompleted: true,
      },
    });

    const isCourseCompleted = completedChapters.length === allChapters.length;
    const isLastChapter =
      chapter.position === allChapters[allChapters.length - 1].position;

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
      isCourseCompleted,
      isLastChapter,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
      isCourseCompleted: false,
      isLastChapter: false,
    };
  }
};

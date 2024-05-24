// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/Banner";
// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import { VideoPlayer } from "./_components/VideoPlayer";
// import { CourseEnrollButton } from "./_components/CourseEnrollButton";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/Preview";
// import { File } from "lucide-react";
// import { CourseProgressButton } from "./_components/CourseProgressButton";
// import Certificate from "./_components/Certificate";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter!" />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div className="flex flex-col max-w-4xl mx-auto pb-20">
//         <div className="p-4">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="p-4 flex flex-col md:flex-row items-center justify-between">
//             <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 price={course.price!}
//               />
//             )}
//           </div>
//           <Separator />
//           <div>
//             <Preview value={chapter.description!} />
//           </div>
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 {attachments.map((attachment) => (
//                   <a
//                     href={attachment.url}
//                     target="_blank"
//                     key={attachment.id}
//                     className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
//                   >
//                     <File />
//                     <p className="line-clamp-1">{attachment.name}</p>
//                   </a>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/Banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/VideoPlayer";
import { CourseEnrollButton } from "./_components/CourseEnrollButton";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/Preview";
import { File } from "lucide-react";
import { CourseProgressButton } from "./_components/CourseProgressButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
    isCourseCompleted,
    isLastChapter,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter!" />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
          {isCourseCompleted && isLastChapter && (
            <div className="p-4">
              <Link href={`/certificate/${params.courseId}`} passHref>
                <Button>Get Certificate</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;

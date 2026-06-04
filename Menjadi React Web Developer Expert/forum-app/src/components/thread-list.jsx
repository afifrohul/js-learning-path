import ThreadItem from '@/components/thread-item';

export default function ThreadList({ threads, upVote, downVote, neutralVote }) {
  if (threads.length <= 0) {
    return (
      <div className="space-y-4 mt-3">
        <p className="text-xs text-center">Thread not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-3">
      {threads.map((thread, index) => (
        <ThreadItem
          key={index}
          thread={thread}
          upVote={upVote}
          downVote={downVote}
          neutralVote={neutralVote}
        />
      ))}
    </div>
  );
}

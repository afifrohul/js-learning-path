import ThreadList from '@/components/thread-list';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

function ThreadPage() {
  const threads = [
    {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      category: 'redux',
      createdAt: '2023-05-29T07:55:52.266Z',
      ownerId: 'user-mQhLzINW_w5TxxYf',
      totalComments: 1,
      upVotesBy: ['user-mQhLzINW_w5TxxYf'],
      downVotesBy: [],
    },
    {
      id: 'thread-91KocEqYPRz68MhD',
      title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
      body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
      category: 'perkenalan',
      createdAt: '2023-05-29T07:54:35.746Z',
      ownerId: 'user-aROWej8yYA1sOfHN',
      totalComments: 1,
      upVotesBy: ['user-mQhLzINW_w5TxxYf'],
      downVotesBy: [],
    },
  ];

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Thread available</p>
          <Link
            to="/threads/add"
            className="border hover:bg-accent py-0.5 px-1 rounded duration-200 transition-all"
          >
            <div className="flex gap-1 items-center">
              <Plus className="w-3.5 h-3.5" />
              <p className='text-xs font-semibold'>Create New Thread</p>
            </div>
          </Link>
        </div>
        <ThreadList threads={threads} />
      </div>
    </div>
  );
}

export default ThreadPage;

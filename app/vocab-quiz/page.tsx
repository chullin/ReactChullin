import VocabularyQuiz from '@/components/vocab-quiz/VocabularyQuiz';

export const metadata = {
  title: 'English Vocabulary Quiz | Joseph Chen',
  description: '挑戰多個難度的英文單字測驗，提升你的詞彙量。',
};

export default function VocabQuizPage() {
  return (
    <main className="bg-gray-50/50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <VocabularyQuiz />
      </div>
    </main>
  );
}

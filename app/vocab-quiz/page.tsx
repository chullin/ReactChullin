import VocabularyQuiz from '@/components/vocab-quiz/VocabularyQuiz';

export const metadata = {
  title: 'English Vocabulary Quiz | Joseph Chen',
  description: '挑戰多個難度的英文單字測驗，提升你的詞彙量。',
};

export default function VocabQuizPage() {
  return (
    <main className="tw-bg-gray-50 tw-min-h-screen tw-pt-12 tw-pb-24">
      <div className="container px-4">
        <VocabularyQuiz />
      </div>
    </main>
  );
}

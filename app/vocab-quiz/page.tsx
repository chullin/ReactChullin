import VocabularyQuiz from '@/components/vocab-quiz/VocabularyQuiz';

export const metadata = {
  title: 'English Vocabulary Quiz | Joseph Chen',
  description: '挑戰多個難度的英文單字測驗，提升你的詞彙量。',
};

export default function VocabQuizPage() {
  return (
    <div className="site-page">
      <div className="site-container">
        <VocabularyQuiz />
      </div>
    </div>
  );
}

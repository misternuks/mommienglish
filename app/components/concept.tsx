import styles from './concept.module.css'

export default function Concept() {
  return (
    <section id='concept' className = {styles.concept} >
      <div className = {styles['concept-vertical-text-container']}>
        <div className = {styles['concept-vertical-text']}>ママのための</div>
        <div className = {styles['concept-vertical-text']}>英語習慣化プログラム</div>
      </div>
      <div className = {styles['concept-horizontal-text-container']}>
        <div className = {styles['concept-title']}>
          <h1>子どもと一緒に</h1>
          <h1>親子の英会話を楽しむ</h1>
        </div>
        <div className = {styles['concept-paragraph']}>
          <p>
            留学してから気づいた、実用性のない中学・高校英語。
            子どもができてから知った、ママと子どもの信頼関係。
            国際寮で身近に感じた、学生たちの英語への向き合い方と成長。
            英会話の先生になって実感した、日本の違和感のある英語教育。
            ママであり、英語の先生でもある私だから伝えられる
            子どもだけが頑張るのではなく、ママだけが悩むのではない。
            親子両想い型の英語共育を広げたい。
          </p>
        </div>
      </div>
    </section>
  );
}

import styles from './concept.module.css'

export default function Concept() {
  return (
    <section className = {styles.concept} >
      <div className = {styles['concept-vertical-text-container']}>
        <div className = {styles['concept-vertical-text']}>ママのための</div>
        <div className = {styles['concept-vertical-text']}>英語習慣化プログラムです</div>
      </div>
      <div>

      </div>
    </section>
  );
}

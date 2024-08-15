export default function HomePage() {
  return (
    <section className = "banner">
      <div className = "banner-hero">
        <h1>
          ママが<span className="red-text">笑</span>っていれば</h1>
          <h1>それだけで<span className="red-text">嬉</span>しい。</h1>
      <button className="red-button">
        お問い合わせはこちら
      </button>
      </div>
      <div >
        <ul className="banner-buttons">
          <li><a href="">HOME</a></li>
          <li><a href="">サービス内容</a></li>
          <li><a href="">料金</a></li>
          <li><a href="">お問い合わせ</a></li>
          <li><a href="">受講生専用PAGE</a></li>
        </ul>
      </div>
    </section>
  );
}

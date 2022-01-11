const Subscribe = () => {
  return (
    <section className="subscribe">
      <div style={{ backgroundImage: 'url(/images/wall/headphones2.jpg)' }} className="subscribe__content">
        <h4>Unique Features Of Leatest & Trending Products</h4>
        <ul>
          <li>All headphones comes with 3 year warranty & are water proof.</li>
          <li>Reinforced with double speakers, good base, treble - dolby atoms
            support and active noise cancellation.</li>
          <li>Soft Cussion for smooth music experience.</li>

        </ul>

        <div className="subscribe__form">
          <button type="submit" className="btn btn--rounded btn--yellow">Add To Cart</button>
          <div className="display_flex">
            <div>skull Candy Headphones</div>
            <div>$32.00</div>
          </div>
        </div>
      </div>
    </section>
  )
};


export default Subscribe
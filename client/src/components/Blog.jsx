import React from "react";
import "./Blog.css"; 

export default function Blog() {
  return (
    <div className="blog-page">
      <h1>Our Blog</h1>
      <p className="blog-intro">
        Explore our latest safari stories, travel adventures, and tips for unforgettable journeys across Kenya and East Africa.
      </p>

        <article className="blog-post">
        <h2>Chasing Sunsets in the Maasai Mara</h2>
        <img src="/assets/Masai Mara at Sunset.jpeg" alt="Sunset in Maasai Mara" className="blog-img" />
        <p>
            In August of last year, our guests witnessed the spectacular Great Wildebeest Migration, one of nature’s most breathtaking spectacles. As the sun dipped below the savannah, the Maasai Mara sky blazed with golden and crimson hues. The air was alive with the sounds of wildebeest and zebra, making for a truly magical safari evening.
        </p>

      
        <div className="blog-img-gallery">
            <img src="/assets/wildebeest migration.jpeg" alt="Wildebeest Herd Migration" className="blog-img small" />
            <img src="/assets/wildebeest2.jpeg" alt="Wildebeest Crossing" className="blog-img small" />
        </div>

        <p>
            The sight of thousands of wildebeest thundering across the plains in search of greener pastures is an unforgettable moment that connects you directly with nature’s rhythm.
        </p>
        <p>
            <strong>Tip:</strong> Visit between July and October for the best migration sightings, and don’t forget your camera for those unforgettable sunset moments!
        </p>
        </article>


      <article className="blog-post">
        <h2>Destination Spotlight: Amboseli National Park</h2>
        <img src="/assets/kilimanjaro2.jpg" alt="Elephants in Amboseli" className="blog-img" />
        <p>
          Amboseli is world-famous for its stunning views of Mt. Kilimanjaro and its large elephant herds. Our recent travelers enjoyed close encounters with these gentle giants, observed flamingos at the swamps, and captured iconic photographs with Africa's highest peak as a backdrop.
        </p>
        <p>
          <strong>Travel Tip:</strong> The dry season (June–October) is ideal for game viewing, as animals gather around water sources.
        </p>
      </article>

   
      <article className="blog-post">
        <h2>Hiking the Aberdares</h2>
        <img src="/assets/Hiking aberdare.jpeg" alt="Hiking in Aberdares" className="blog-img" />
        <p>
          Adventure called, and we answered! Our hikers braved misty forests, sparkling waterfalls, and steep mountain trails in the Aberdares. While the weather was sometimes unpredictable, reaching the summit rewarded everyone with panoramic views and a sense of accomplishment.
        </p>
        <p>
          <strong>Why hike with us?</strong> Our expert guides, supportive groups, and tailored itineraries make every climb safe and memorable. Book with Osman Adventures and you will not regret it!
        </p>
      </article>
    </div>
  );
}

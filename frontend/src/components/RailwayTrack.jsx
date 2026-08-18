import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import TrainIcon from "./TrainIcon";

function RailwayTrack() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 25%"],
  });

  const trainLeft = useTransform(
    scrollYProgress,
    [0, 1],
    ["4%", "96%"]
  );

  return (
    <section
      ref={sectionRef}
      className="railway-journey"
    >
      <div className="railway-journey-inner">

        <div className="railway-heading">
          <div>
            <p className="section-label">JOURNEY OUTLOOK</p>
            <h2>How your waitlist could move</h2>
          </div>

          <span>Scroll to follow</span>
        </div>

        <div className="railway-map">

          <div className="railway-labels">
            <span>
              <strong>BOOKING</strong>
              <small>WL 27</small>
            </span>

            <span>
              <strong>WAITLIST</strong>
              <small>WL 16</small>
            </span>

            <span>
              <strong>RAC</strong>
              <small>RAC</small>
            </span>

            <span>
              <strong>CONFIRMED</strong>
              <small>CNF</small>
            </span>
          </div>

          <div className="railway-line">

            <div className="rail railway-line-top" />
            <div className="rail railway-line-bottom" />

            <div className="railway-stops">
              <span />
              <span />
              <span />
              <span />
            </div>

            <motion.div
              className="railway-train"
              style={{
                left: trainLeft,
              }}
            >
              <TrainIcon />
            </motion.div>

          </div>

        </div>

        <div className="railway-caption">
          <span>Earlier position</span>

          <div>
            <span className="caption-dot" />
            <span>
              Historical movement of comparable tickets
            </span>
          </div>

          <span>Expected improvement</span>
        </div>

      </div>
    </section>
  );
}

export default RailwayTrack;
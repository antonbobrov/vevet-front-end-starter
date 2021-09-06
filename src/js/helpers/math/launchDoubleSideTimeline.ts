import { TimelineModule } from 'vevet';

export default function launchDoubleSideTimeline (
    timeline: TimelineModule,
    dir: boolean,
    duration: number,
) {
    timeline.pause();
    if (dir) {
        if (timeline.progress === 1) {
            return;
        }
        if (timeline.reversed) {
            timeline.reverse();
        }
    } else if (!dir) {
        if (timeline.progress === 0) {
            return;
        }
        if (!timeline.reversed) {
            timeline.reverse();
        }
    }

    timeline.play({
        duration,
    });
}

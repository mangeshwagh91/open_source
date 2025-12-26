import Leaderboard from '../models/Leaderboard.js';
import Contribution from '../models/Contribution.js';
import Student from '../models/Student.js';

export const rebuildLeaderboardFromContributions = async () => {
  // Aggregate points and contributions per student
  const pipeline = [
    { $match: { student: { $ne: null } } },
    { $group: { _id: '$student', points: { $sum: '$points' }, contributions: { $sum: 1 } } },
    { $sort: { points: -1 } },
  ];

  const agg = await Contribution.aggregate(pipeline);
  const students = await Student.find({ _id: { $in: agg.map(a => a._id) } }).select('name avatar github linkedin');
  const studentMap = new Map(students.map(s => [s._id.toString(), s]));

  // Wipe and rebuild to guarantee rank uniqueness
  await Leaderboard.deleteMany({});

  let rank = 1;
  for (const a of agg) {
    const s = studentMap.get(a._id.toString());
    if (!s) continue;
    await Leaderboard.create({
      rank,
      name: s.name,
      github: s.github,
      linkedin: s.linkedin,
      points: a.points,
      avatar: s.avatar,
      contributions: a.contributions,
      badge: rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : null,
    });
    rank += 1;
  }

  return { total: agg.length };
};

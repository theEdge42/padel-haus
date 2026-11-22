// Perspective drawing of a Padel Haus court, in metres: x 0–10 across, z 0–20 near → far, h height.
type Point = [x: number, z: number, h?: number];
type Segment = [Point, Point];

export const COURT_VIEW = { width: 320, height: 440 };
const CAMERA = 8;
const SCALE = 30;
const CENTER_X = 160;
const HORIZON_Y = 160;
const NEAR_Y = 430;

function project(x: number, z: number, h = 0) {
  const f = CAMERA / (CAMERA + z);
  return [CENTER_X + (x - 5) * SCALE * f, HORIZON_Y + (NEAR_Y - HORIZON_Y) * f - h * SCALE * f];
}

const point = (p: Point) => project(...p).map((n) => n.toFixed(1)).join(" ");
const polygon = (points: Point[], close = false) => `M${points.map(point).join(" L")}${close ? " Z" : ""}`;
const segments = (list: Segment[]) => list.map(([a, b]) => `M${point(a)} L${point(b)}`).join(" ");

function range(from: number, to: number, step: number) {
  const values: number[] = [];
  for (let v = from; v <= to + 1e-6; v += step) values.push(Number(v.toFixed(3)));
  return values;
}

export const COURT_BOUNDS = {
  width: 10 * SCALE,
  top: project(0, 20, 4)[1],
  bottom: NEAR_Y,
};

// Enclosure of each side wall, near → far:
//   0–2 m   glass 3 m, with a mesh panel on top up to 4 m
//   2–4 m   glass 3 m, nothing on top
//   4–16 m  six framed mesh panels, 3 m high and 2 m wide. The middle two share a door centred on the net:
//           70% of the mesh height and 120% of a panel's width
//   16–20 m mirror of the near end
// Glass panels meet at thin seams, mesh panels have thin frames, only the corners are thicker posts.
const MESH_STEP = 0.15; // coarser than the real ~5 cm so that it stays readable
const DOOR = { start: 8.8, end: 11.2, height: 2.1 };
const NET_HEIGHT = 1.1; // slightly taller than the real 0.88 m so that it reads at this size

function buildCourt() {
  const glass: string[] = [];
  const mesh: string[] = [];
  const posts: Segment[] = [];
  const rails: Segment[] = [];
  const seams: Segment[] = [];

  const sideMesh = (x: number, z0: number, z1: number, h0: number, h1: number) =>
    segments([
      ...range(z0, z1, MESH_STEP).map((z): Segment => [[x, z, h0], [x, z, h1]]),
      ...range(h0, h1, MESH_STEP).map((h): Segment => [[x, z0, h], [x, z1, h]]),
    ]);

  for (const x of [0, 10]) {
    for (const [z0, z1] of [[0, 4], [16, 20]]) {
      glass.push(polygon([[x, z0], [x, z1], [x, z1, 3], [x, z0, 3]], true));
      seams.push([[x, z0 + 2], [x, z0 + 2, 3]], [[x, z0, 3], [x, z1, 3]]);
    }

    for (const [z0, z1] of [[0, 2], [18, 20]]) {
      mesh.push(sideMesh(x, z0, z1, 3, 4));
      rails.push([[x, z0, 4], [x, z1, 4]], [[x, z0, 3], [x, z1, 3]]);
      const upright = z0 === 0 ? z1 : z0;
      posts.push([[x, upright, 3], [x, upright, 4]]);
    }

    for (let a = 4; a < 16; a += 2) {
      const b = a + 2;
      if (b <= DOOR.start || a >= DOOR.end) {
        mesh.push(sideMesh(x, a, b, 0, 3));
        continue;
      }
      if (a < DOOR.start) mesh.push(sideMesh(x, a, DOOR.start, 0, 3));
      if (b > DOOR.end) mesh.push(sideMesh(x, DOOR.end, b, 0, 3));
      mesh.push(sideMesh(x, Math.max(a, DOOR.start), Math.min(b, DOOR.end), DOOR.height, 3));
    }

    for (const z of range(4, 16, 2)) {
      rails.push(z > DOOR.start && z < DOOR.end ? [[x, z, DOOR.height], [x, z, 3]] : [[x, z], [x, z, 3]]);
    }
    rails.push(
      [[x, DOOR.start], [x, DOOR.start, DOOR.height]],
      [[x, DOOR.start, DOOR.height], [x, DOOR.end, DOOR.height]],
      [[x, DOOR.end, DOOR.height], [x, DOOR.end]],
      [[x, 4, 3], [x, 16, 3]],
    );
    posts.push([[x, 0], [x, 0, 4]], [[x, 20], [x, 20, 4]]);
  }

  // Far wall only: the near wall is where the visitor stands
  glass.push(polygon([[0, 20], [10, 20], [10, 20, 3], [0, 20, 3]], true));
  for (const x of [2, 4, 6, 8]) seams.push([[x, 20], [x, 20, 3]]);
  mesh.push(
    segments([
      ...range(0, 10, MESH_STEP).map((x): Segment => [[x, 20, 3], [x, 20, 4]]),
      ...range(3, 4, MESH_STEP).map((h): Segment => [[0, 20, h], [10, 20, h]]),
    ]),
  );
  for (const x of range(0, 10, 2)) posts.push([[x, 20, 3], [x, 20, 4]]);
  rails.push([[0, 20, 3], [10, 20, 3]], [[0, 20, 4], [10, 20, 4]]);

  const lamps = [4, 10, 16].flatMap((z) =>
    [2.5, 7.5].map((x) => {
      const [left, y] = project(x - 1, z, 7);
      const [right] = project(x + 1, z, 7);
      const height = Math.max(1.5, (right - left) * 0.1);
      // Rounded so that server and client render identical attributes
      const round = (n: number) => Number(n.toFixed(2));
      return { x: round(left), y: round(y), width: round(right - left), height: round(height) };
    }),
  );

  return {
    floor: polygon([[0, 0], [10, 0], [10, 20], [0, 20]], true),
    glass: glass.join(" "),
    mesh: mesh.join(" "),
    seams: segments(seams),
    rails: segments(rails),
    posts: segments(posts),
    lines: [
      polygon([[0, 0], [0, 20], [10, 20], [10, 0]]),
      polygon([[0, 16.95], [10, 16.95]]),
      polygon([[0, 3.05], [10, 3.05]]),
      polygon([[5, 3.05], [5, 16.95]]),
    ],
    net: segments([
      ...range(0, 10, 0.25).map((x): Segment => [[x, 10, 0.05], [x, 10, NET_HEIGHT]]),
      ...range(0.2, NET_HEIGHT - 0.1, 0.2).map((h): Segment => [[0, 10, h], [10, 10, h]]),
    ]),
    netTape: polygon([[0, 10, NET_HEIGHT], [10, 10, NET_HEIGHT]]),
    lamps,
  };
}

export const COURT = buildCourt();

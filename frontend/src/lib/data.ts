import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  FlaskConical,
  GraduationCap,
  Globe2,
  Medal,
  Network,
  Rocket,
  Smartphone,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
};

// "Mengapa Memilih Kami" -- 6 kartu di Beranda
export const features: Feature[] = [
  {
    icon: Award,
    title: "Program Terakreditasi",
    description:
      "Gelar terakreditasi BAN-PT yang diakui secara nasional dan memenuhi standar akademik dan industri yang ketat.",
    image: "/images/gallery-graduation.png",
  },
  {
    icon: BriefcaseBusiness,
    title: "Kemitraan Industri",
    description:
      "Kolaborasi mendalam dengan perusahaan teknologi terkemuka untuk magang, proyek nyata, dan mentoring terjamin.",
    image: "/images/news-2.png",
  },
  {
    icon: FlaskConical,
    title: "Laboratorium Modern",
    description:
      "Lab AI, networking, IoT, dan keamanan siber terkini dilengkapi dengan peralatan tingkat enterprise.",
    image: "/images/gallery-lab.png",
  },
  {
    icon: GraduationCap,
    title: "Dosen Bersertifikat",
    description:
      "Belajar dari pendidik bersertifikat dan praktisi yang membawa pengalaman rekayasa dunia nyata ke kelas.",
    image: "/images/gallery-lecture.png",
  },
  {
    icon: Globe2,
    title: "Kolaborasi Internasional",
    description:
      "Program pertukaran global, penelitian bersama, dan sertifikasi yang diakui di seluruh dunia.",
    image: "/images/profil-campus.png",
  },
  {
    icon: Network,
    title: "Tingkat Kelulusan Tinggi",
    description:
      "94% lulusan kami bekerja atau membangun startup dalam enam bulan setelah kelulusan.",
    image: "/images/gallery-students.png",
  },
];

export type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "2005",
    title: "Didirikan",
    description:
      "STIKOM Tunas Bangsa membuka pintunya dengan visi berani untuk pendidikan teknologi di Sumatera Utara.",
  },
  {
    year: "2011",
    title: "Akreditasi Nasional",
    description:
      "Semua program inti meraih akreditasi BAN-PT, memperkuat kredibilitas akademik.",
  },
  {
    year: "2016",
    title: "Pusat Inovasi",
    description:
      "Peluncuran Pusat Inovasi & Startup kampus, menginkubasi usaha yang dipimpin mahasiswa.",
  },
  {
    year: "2020",
    title: "Transformasi Digital",
    description:
      "Platform pembelajaran hybrid penuh dan lab berbasis cloud diluncurkan di seluruh fakultas.",
  },
  {
    year: "2024",
    title: "Kemitraan Global",
    description:
      "Kolaborasi internasional baru memperluas peluang pertukaran dan sertifikasi ganda.",
  },
];

export const campusHighlights: Value[] = [
  {
    icon: FlaskConical,
    title: "Laboratorium Cerdas",
    description:
      "Lab AI, IoT, networking, dan keamanan siber dengan peralatan enterprise.",
  },
  {
    icon: Smartphone,
    title: "Hub Inovasi",
    description: "Inkubator startup tempat ide mahasiswa menjadi produk nyata.",
  },
  {
    icon: Globe2,
    title: "Kelas Global",
    description: "Kelas hybrid dan terhubung dengan mitra internasional.",
  },
  {
    icon: Users,
    title: "Ruang Kolaboratif",
    description: "Studio terbuka dan ruang maker dirancang untuk kerja tim.",
  },
];

export type Achievement = {
  icon: LucideIcon;
  title: string;
  description: string;
  year: string;
};

export const achievements: Achievement[] = [
  {
    icon: Trophy,
    title: "Juara 1 Gemastik Nasional",
    description:
      "Tim mahasiswa meraih medali emas di ajang kompetisi TI paling bergengsi se-Indonesia.",
    year: "2024",
  },
  {
    icon: Medal,
    title: "Akreditasi Unggul BAN-PT",
    description:
      "Program studi unggulan mencapai peringkat akreditasi tertinggi tingkat nasional.",
    year: "2023",
  },
  {
    icon: Star,
    title: "Top 10 Kampus Teknologi",
    description:
      "Masuk sepuluh besar perguruan tinggi teknologi terbaik di Sumatera menurut pemeringkatan independen.",
    year: "2023",
  },
  {
    icon: Globe2,
    title: "Penghargaan Riset Internasional",
    description:
      "Publikasi dan kolaborasi riset diakui pada konferensi AI dan keamanan siber global.",
    year: "2022",
  },
  {
    icon: Rocket,
    title: "Startup Inkubasi Terbaik",
    description:
      "Lima startup binaan kampus memperoleh pendanaan awal dari investor teknologi.",
    year: "2024",
  },
  {
    icon: BadgeCheck,
    title: "Mitra Sertifikasi Global",
    description:
      "Menjadi authorized training partner untuk sertifikasi cloud dan keamanan kelas dunia.",
    year: "2023",
  },
];

export const galleryImages = [
  {
    src: "/images/gallery-lab.png",
    alt: "Modern computer laboratory",
    span: "row-span-2",
  },
  {
    src: "/images/gallery-students.png",
    alt: "Students collaborating",
    span: "",
  },
  { src: "/images/gallery-library.png", alt: "University library", span: "" },
  {
    src: "/images/gallery-campus.png",
    alt: "Campus aerial view",
    span: "row-span-2",
  },
  { src: "/images/gallery-lecture.png", alt: "Lecture hall", span: "" },
  {
    src: "/images/gallery-graduation.png",
    alt: "Graduation ceremony",
    span: "",
  },
];

export const statIconMap: Record<string, LucideIcon> = {
  "Mahasiswa Aktif": Users,
  "Alumni Dunia": GraduationCap,
  "Dosen Bersertifikat": Award,
  "Publikasi Penelitian": FlaskConical,
  "Perusahaan Mitra": BriefcaseBusiness,
};

export const vocationalPrograms: never[] = [];
export const graduatePrograms: never[] = [];

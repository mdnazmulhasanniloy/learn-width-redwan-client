import student1 from "@/assets/homeImage/student-1.png";
import student2 from "@/assets/homeImage/student-2.png";
import student3 from "@/assets/homeImage/student-3.png";
import student4 from "@/assets/homeImage/student-4.png";

export type ICourse = {
  createdAt: string;
  currentBatch: number;
  duration: number;
  id: string;
  isActive: boolean;
  name: string;
  regularPrice: number;
  thumbnail: string;
  updatedAt: string;
  _id: string;
  description: string;
};

export const successStudent = [
  { name: "Redwan Hossen", role: "App Developer", img: student1 },
  { name: "Nensy", role: "Graphics Designer", img: student2 },
  { name: "Jon Mark", role: "Web Developer", img: student3 },
  { name: "Shayla", role: "UI/UX Designer", img: student4 },
];

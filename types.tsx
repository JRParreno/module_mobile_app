/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Activity from "./models/Activity";
import Amun from "./models/Amun";
import Lecture from "./models/Lecture";
import Quarter from "./models/Quarter";
import { QuizScore } from "./models/Score";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Landing: undefined;
  Amun: undefined;
  Leksyon: undefined;
  Exam: undefined;
};

export type AmunStackParamList = {
  AmunHome: undefined;
  Game: {
    amun: Amun;
  };
};

export type LeksyonParamList = {
  LeksyonQuarter: undefined;
  LeksyonView: {
    lecture: Lecture;
  };
  Activities: {
    lecture: Lecture;
  };
  Lectures: {
    quarter: Quarter;
  };
};

export type ExamParamList = {
  ExamQuarter: undefined;
  ExamView: {
    activity: Activity;
  };
  ExamList: {
    quarter: Quarter;
  };
  ExamScore: {
    quizzes: Array<QuizScore>;
  };
  OverviewExamScore: {
    quiz: QuizScore;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { HeadingElement, ListElement, ParagraphElement } from "@/components/Editor/type";

type CustomElement = ParagraphElement | HeadingElement | ListElement;
type CustomText = { text: string; [key: string]: any };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

import { ImageSourcePropType } from "react-native";
import { commonStyles } from "../styles/commonStyles";

export type CategoryType = "work" | "personal" | "event";

class CategoryUtils {
  static defaultCategory: CategoryType = "work";

  private static categoryIcons: Record<CategoryType, ImageSourcePropType> = {
    work: require("../assets/work_icon.png"),
    personal: require("../assets/personal_icon.png"),
    event: require("../assets/event_icon.png"),
  };

  private static categoryBgColors: Record<CategoryType, any> = {
    work: commonStyles.categoryWorkBgColorr,
    personal: commonStyles.categoryPersonalBgColor,
    event: commonStyles.categoryEventBgColor,
  };

  static getIcon(category: CategoryType): ImageSourcePropType {
    return this.categoryIcons[category];
  }

  static getBgColor(category: CategoryType) {
    return this.categoryBgColors[category];
  }

  static get categories(): CategoryType[] {
    return Object.keys(this.categoryIcons) as CategoryType[];
  }
}

export default CategoryUtils;

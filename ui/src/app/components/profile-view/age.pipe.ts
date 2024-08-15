import { Pipe, PipeTransform } from "@angular/core";
import { differenceInYears } from "date-fns";

@Pipe({
  name: "age",
})
export class AgePipe implements PipeTransform {
  transform(birthDate?: Date): string {
    if (!birthDate) {
      return "";
    }

    return differenceInYears(new Date(), birthDate).toString();
  }
}

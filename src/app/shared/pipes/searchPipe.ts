import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../../models/product";

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(items: Product[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        searchText = searchText.toLowerCase();
        return items.filter(item => {
            return item.title?.toLowerCase().includes(searchText);
        });
    }
}
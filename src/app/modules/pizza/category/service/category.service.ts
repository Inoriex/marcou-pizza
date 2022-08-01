import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryDTO } from "../dto/category.dto";
import { Category } from "../schema/category.schema";

@Injectable()
export class CategoryService {
  constructor(@InjectModel("category") private readonly categoryModel: Model<Category>) {}
  async getAllCategory(): Promise<Category[]> {
    return await this.categoryModel.find({}).exec();
    // OR findOne(category => category.name === categoryName);
  }
  /*  async getCurrentCategory(categoryId: string): Promise<Category[]> {
    return await this.categoryModel.find({ _id: categoryId }).exec();
  } */
  async getCategory(categoryId: string): Promise<Category> {
    return await this.categoryModel.findById(categoryId);
  }
  /* async getCategory(categoryName: string): Promise<Category[]> {
    console.log(categoryName);
    return await this.categoryModel.find({ _id: categoryName }).exec();
  } */
  async updateCategory(categoryId: string, category: Partial<CategoryDTO>): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(categoryId, category, { new: true });
  }
  async deleteCategory(categoryId: string): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(categoryId, { active: false });
  }
  async createCategory(category: CategoryDTO): Promise<Category> {
    const existingCategory = await this.categoryModel.find({ name: category.name }).exec();
    if (existingCategory && existingCategory.length > 0) {
      return existingCategory[0];
    }
    const newCategory = new this.categoryModel(category);
    return await newCategory.save();
  }
}

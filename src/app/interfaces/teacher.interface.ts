export interface Teacher {
  id?: number,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  password: string,
  role_id: number,
  phone: number,
  avatar?: string,
  latitude?: string,
  longitude?: string,
  city_id: number,
  address: string,
  province: string,
  price_hour: number,
  experience: number,
  category_id: number,
  subject?: string,
  is_approved: number,
  avg_rating: number,
  start_class_hour: number,
  end_class_hour: number,
  category_title?: string,
  teacher_id?: number

  
}

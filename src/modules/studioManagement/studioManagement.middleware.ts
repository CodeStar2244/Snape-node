import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../db/db.config";
import { StudioSpeciality } from "../../entities/studioSpeciality";

export class StudioManagementMiddleware {
  public isSpecialityNotExists = async (
    req: any,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(StudioSpeciality);
    const result = await userRepository.findOne({
      where: { id: Number(id), createdBy: { id: req?.user?.id } },
    });

    if (!result) {
      return res
        .status(400)
        .json({ message: "Speciality not exist", code: 400 });
    } else {
      next();
    }
  };
}

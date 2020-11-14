import { getRepository } from 'typeorm';

import ProfileStages from '../../models/ProfileStages';
import AppError from '../../errors/AppErros';

interface Request {
  provider_id: string;

  target: number;

  skills: string;

  initial: boolean;

  state: string;
}

class UpdateProfileStageServices {
  public async execute({
    provider_id,
    target,
    skills,
    initial,
    state,
  }: Request): Promise<ProfileStages> {
    const ProfileRepository = getRepository(ProfileStages);

    let profileExists = await ProfileRepository.findOne({
      where: { provider_id },
    });

    if (!profileExists) {
      throw new AppError('Not exists database profile', 400);
    }

    profileExists.provider_id = provider_id;
    profileExists.target = target;
    profileExists.skills = skills;
    profileExists.initial = initial;
    profileExists.state = state;

    const profileUpdated = await ProfileRepository.save(profileExists);

    return profileUpdated;
  }
}

export default UpdateProfileStageServices;

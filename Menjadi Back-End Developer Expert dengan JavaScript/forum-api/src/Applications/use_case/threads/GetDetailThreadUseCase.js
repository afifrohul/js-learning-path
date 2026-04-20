class GetDetailThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    return this._threadRepository.detailThread(useCasePayload);
  }
}

export default GetDetailThreadUseCase;

export default {
  /**
   *
   * @param place
   */
  change: place => {
    return { type: 'commentForm/changePlace', payload: { place } };
  },

  reset: () => {
    return { type: 'commentForm/reset' };
  }
};

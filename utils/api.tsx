import axios from 'axios'

export async function fetchQuestions() {
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch questions");
  }
}

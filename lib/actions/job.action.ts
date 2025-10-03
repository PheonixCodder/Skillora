export const fetchLocation = async () => {
  const response = await fetch("http://ip-api.com/json/?fields=country");
  const location = await response.json();
  return location.country;
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

interface JobFilterParams {
  query?: string;
  location?: string;
  jobType?: string;      // e.g. “Full-time”, “Part-time”, “Remote”
  page?: number;
  pageSize?: number;
}

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, location } = filters;

  // Base URL
  const baseUrl = "https://findwork.dev/api/jobs";

  // Build URL with query params
  const url = new URL(baseUrl);

  if (query !== "") url.searchParams.append("search", query ?? "");

  if (location !== "") url.searchParams.append("location", location ?? "");


  const response = await fetch(url.toString(), {
    headers: {
      "Authorization": `Token ${process.env.FINDWORK_API_KEY ?? ""}`,
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch jobs from Findwork");
  }

  const data = await response.json();

  // The API might already return the filtered & paginated data
  // Return it directly if so
    return data.results.map((job: any) => ({
    id: job.id,
    employer_logo: job.logo,
    employer_website: job.company_url ?? job.url,
    job_employment_type: job.employment_type,
    job_title: job.role,
    job_description: job.text.replace(/<[^>]+>/g, ""), // strip HTML
    job_apply_link: job.url,
    job_city: null,
    job_state: null,
    job_country: null,
    remote: job.remote,
    company_name: job.company_name,
    date_posted: job.date_posted,
    keywords: job.keywords,
  }));

};

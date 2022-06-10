import { useCallback, useEffect, useState } from 'react';
import { getCreatorContentsAPI } from '../../../services/contents';
import ProfileContentItem from '../../molecules/ProfileContentItem';

const ProfileContents = (props) => {
  const { id_creator, fetchContents, setFetchContents, onCloseAdd, onCloseEdit, email } = props;

  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const getCreatorContents = useCallback(async (id_creator) => {
    try {
      setIsLoading(true);
      const response = await getCreatorContentsAPI(id_creator);

      if (response.error) {
        throw new Error();
      }

      setContents(response.data.result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchContents) {
      getCreatorContents(id_creator);
    }

    setFetchContents(false);
  }, [getCreatorContents, id_creator, fetchContents, setFetchContents]);

  return (
    <div className="pt-40 pb-6 px-24">
      <h5 className="ml-40 text-lg font-normal italic">{email}</h5>
      <button
        onClick={() => onCloseAdd((prevState) => !prevState)}
        className="mt-16 mb-4 bg-goGold font-semibold text-goDarkBlue py-1 px-4 rounded-md"
      >
        New Content
      </button>
      <div
        className={`flex ${
          contents.length > 4 ? 'justify-center' : 'justify-start'
        } flex-wrap gap-4`}
      >
        {contents.map((content) => (
          <ProfileContentItem
            onCloseEdit={onCloseEdit}
            key={content.id_content}
            length={contents.length}
            title={content.title}
            url={content.url}
            id_content={content.id_content}
            thumbnail={content.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileContents;

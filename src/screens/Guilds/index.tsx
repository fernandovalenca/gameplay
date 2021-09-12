import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';

import { api } from '../../services/api';

import { Guild, ListDivider, Load } from '../../components';
import { GuildProps } from '../../components/Guild';

import { styles } from './styles';

interface Props {
  handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');

    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Load />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleGuildSelect(item)} />
          )}
          contentContainerStyle={{ paddingBottom: 30, paddingTop: 30 }}
          ItemSeparatorComponent={() => <ListDivider isCentralized />}
          ListHeaderComponent={<ListDivider isCentralized />}
          ListFooterComponent={<ListDivider isCentralized />}
          showsVerticalScrollIndicator={false}
          style={styles.guilds}
        />
      )}
    </View>
  );
}

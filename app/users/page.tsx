import { getUsers } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import { Mail, User as UserIcon } from 'lucide-react'

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Manage app users</p>
      </div>

      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => {
            if (!user || !user.id) return null
            const avatar = user.metadata?.avatar
            const role = user.metadata?.role
            const fullName = getMetafieldValue(user.metadata?.full_name) || user.title
            const email = getMetafieldValue(user.metadata?.email)
            const bio = getMetafieldValue(user.metadata?.bio)

            return (
              <div key={user.id} className="card p-6">
                <div className="flex items-center gap-4">
                  {avatar?.imgix_url ? (
                    <img
                      src={`${avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                      alt={fullName}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{fullName}</h3>
                    {role && (
                      <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${role === 'Admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'}`}>
                        {getMetafieldValue(role)}
                      </span>
                    )}
                  </div>
                </div>

                {email && (
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-300">
                    <Mail size={16} />
                    <span className="truncate">{email}</span>
                  </div>
                )}

                {bio && (
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{bio}</p>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <UserIcon className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-500 dark:text-gray-400">No users found</p>
        </div>
      )}
    </div>
  )
}